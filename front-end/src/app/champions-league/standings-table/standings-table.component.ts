import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-standings-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './standings-table.component.html',
  styleUrl: './standings-table.component.css'
})
export class StandingsTableComponent {
  allTeamsWithOpponents = new Map<any, any>() ;
  teamsStandingArray: any[] = [];
  teamsMatchesArray: any[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.allTeamsWithOpponents = this.dataService.getAllOpponents();
    this.generateStanding();
    this.generateMatchs();
  }

  generateStanding(){
    this.allTeamsWithOpponents.forEach((value, key) => {
      const standingInfo =
        {
          played: 0,
          wins: 0,
          draws: 0,
          loses: 0,
          gFor: 0,
          gAgainst: 0,
          points: 0,
          lastFiveMatches: ['W','L','W','D','W'],
          logo: key.logo,
          name:  key.name
        };

      this.teamsStandingArray.push(standingInfo);
    });
    this.teamsStandingArray.sort((a,b) => a.name.localeCompare(b.name))
  }

  generateMatchs(){
    let index = 0;
    this.allTeamsWithOpponents.forEach((values, key) => {
      const valuesArray = Array.from(values);
      const randomIndex = Math.floor(Math.random() * values.size);
      const randomTeam = valuesArray[randomIndex] as any;

      let homeTeam, awayTeam;
      if(randomTeam.isPlayAtHome){
        homeTeam = key;
        awayTeam = randomTeam
      } else if(!randomTeam.isPlayAtHome){
        awayTeam = key;
        homeTeam = randomTeam
      }

      if (!this.teamsMatchesArray[0]) {
        this.teamsMatchesArray[0] = [];
      }

      index++;
      this.teamsMatchesArray[0].push({id:index, homeTeam, awayTeam });
    })
  }
}
