import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../data.service';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-league-phase-draw',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './league-phase-draw.component.html',
  styleUrl: './league-phase-draw.component.css'
})
export class LeaguePhaseDrawComponent {

  constructor(private dataService: DataService) {}

  pots: any[][] = [];
  shuffledPot: any[] = [];
  currentPotIndex: number = 0; //0-3
  currentTeamIndex: number = 0; //0-8
  nextButtonStatus: string = 'calculateOpponents';
  allOpponents = new Map<any, any>() ;
  allOpponentsArray: any[] = [];
  calculatedOpponents: boolean = false;

  ngOnInit(): void {
    this.pots = this.dataService.pots;

    if (this.pots.length > 0) {
      this.shuffledPot = this.pots.map(pot => this.shuffleArray([...pot]));
    }
  }

  shuffleArray(array: any[]): any[] {
    let currentIndex = array.length, randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
  }

  isOriginalTeam(suffledTeam: any, origninalTeam: any): string {
    let teamSlectionStatus;
      if(origninalTeam.name === suffledTeam.name){
        teamSlectionStatus = 'current';
        origninalTeam.isSelected = true;
      } else {
        if(origninalTeam.isSelected === true){
          teamSlectionStatus = 'selected';
        } else {
          teamSlectionStatus = 'notSelected';
        }
      }
    return teamSlectionStatus;
  }

  showNextTeam(): void {
    if (this.currentTeamIndex < this.shuffledPot[this.currentPotIndex].length - 1) {
      this.nextButtonStatus = 'calculateOpponents';
      this.currentTeamIndex++;
    }
    this.calculatedOpponents = false;
  }

  calculateOpponentsButton(){
    if(this.currentTeamIndex === 8 && this.currentPotIndex < 3){
      this.nextButtonStatus = 'showNextPot';
    }else if(this.currentTeamIndex === 8 && this.currentPotIndex === 3) {
      this.nextButtonStatus = 'showAllMatchTables';
    } else {
      this.nextButtonStatus = 'showNextTeam';
    }
    this.calculateOpponents();
    this.calculatedOpponents = true;
  }

  calculateOpponents(){
    let currentTeam = this.shuffledPot[this.currentPotIndex][this.currentTeamIndex];
    let availableTeamToPlay = [];
    let opponentTeams = new Set();

    this.pots.forEach((pot, index) => {
      availableTeamToPlay = pot.filter((team) => {
        return  team.country !== currentTeam.country
      })
      let homeTeam = this.generateAvailableTeamsToPlay(availableTeamToPlay);
      opponentTeams.add({ ...homeTeam, isPlayAtHome: true, pot: index + 1});

      let awayTeam = this.generateAvailableTeamsToPlay(availableTeamToPlay);
      opponentTeams.add({ ...awayTeam, isPlayAtHome: false, pot: index + 1});
      //mipos na ginei edo? to 3o rule
    });

    let opponentTeamsArray = Array.from(opponentTeams).sort(this.compareOpponentCountries);
    let counter = 1;
    let currentCountry = '';

    opponentTeamsArray.forEach((oppoTeam: any) => {
      if(currentCountry != oppoTeam.country) {
        currentCountry = oppoTeam.country;
        counter = 1;
      } else if(counter === 2){
        opponentTeams.delete(oppoTeam);
      } else {
        counter ++;
      }
    });

    // edo tora prepei na kanoume enan elengxo gia to epomeno rule,
    // pou prepei na elengei tous antipalous, na min exoun pano apo 2 antipalous apo to idio pot
    // Paradeigma:
    // currentteam = Arsenal
    // opponentTeams = TeamA, TeamB apo pot 1; TeamC TeamD apo pot 2 ...
    // currentTeaam = Real
    // opponentTeams = TeamB, TeamE apo pot 1; TeamF TeamG apo pot 2 ...
    // currentTeam = City
    // opponentTeams = TeamE, TeamB apo pot 1; TeamG TeamF apo pot 2 ...
    // edo de prepei na exei tin teamB, giati exei idi klirothei me 2 antipalous apo to idio pot
    // ALSO
    // an mia omada klirothei px me tin Arsenal oste na paiksei sto gipedo tis arsenal, ara ektos edras gia autin,
    // tora tha mporei na klirothei me mia omada mono gia to entos edras tis paixnidi
    // to opoio mporoume na doume apo tin grammi 92 kai 95 :)

    if(opponentTeams.size === 8){
      this.allOpponents.set(currentTeam, opponentTeams);
      this.allOpponentsArray = Array.from(this.allOpponents.get(currentTeam));
    } else {
      this.calculateOpponents();
    }
  }

  compareOpponentCountries( a: any, b:any ) {
    if ( a.country < b.country ){
      return -1;
    }
    if ( a.country > b.country ){
      return 1;
    }
    return 0;
  }


  generateAvailableTeamsToPlay(availableTeamToPlay: any[]){
    let randomOpponentNumber = Math.floor(Math.random() * availableTeamToPlay.length);
    let selectedTeam = availableTeamToPlay[randomOpponentNumber];
    availableTeamToPlay.splice(randomOpponentNumber, 1);
    return selectedTeam;
  }

  showNextPot(): void {
    if (this.currentPotIndex < this.shuffledPot.length - 1) {
      this.currentPotIndex++;
      this.currentTeamIndex = 0;
      this.nextButtonStatus = 'calculateOpponents'
    } else {
      this.nextButtonStatus = 'showAllMatchTables'
    }
    this.calculatedOpponents = false;
  }

  showAllMatchTables(){
    this.dataService.setAllOpponents(this.allOpponents);
  }
}
