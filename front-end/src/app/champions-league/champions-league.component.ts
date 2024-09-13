import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-champions-league',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './champions-league.component.html',
  styleUrl: './champions-league.component.css'
})
export class ChampionsLeagueComponent {
  dataFetched: boolean = false;
  allTeams: any;
  pots: any[][] = [];
  loadingText: string = 'Loading data...';

  constructor(private http: HttpClient, private dataService: DataService) { }

  handleClick() {
    this.getAllTeamsToPots();
  }

  getAllTeamsToPots(){
    const url = 'http://localhost:8080/teams';
    this.http.get(url).subscribe(
      (response) => {
        this.allTeams = response;
        this.splitIntoGroups(this.allTeams, 9);
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  splitIntoGroups(data: any[], groupSize: number) {
    for (let i = 0; i < data.length; i += groupSize) {
      this.pots.push(data.slice(i, i + groupSize));
    }
    if(this.pots){
      this.dataService.pots = this.pots;
      this.dataFetched = true;
    } else {
      this.loadingText = 'There was an issue with the data.'
    }
  }

}
