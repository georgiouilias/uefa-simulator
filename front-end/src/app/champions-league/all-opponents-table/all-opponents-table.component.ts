import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../data.service';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-all-opponents-table',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './all-opponents-table.component.html',
  styleUrl: './all-opponents-table.component.css'
})
export class AllOpponentsTableComponent {
  allOpponents = new Map<any, any>() ;
  currentPot: number = 1;
  totalPots: number = 4;

  constructor(private dataService: DataService) {}


  ngOnInit(): void {
    this.allOpponents = this.dataService.getAllOpponents();

  }

  getOpponentTeams(team: any): any[] {
    const homeTeams = Array.from(this.allOpponents.get(team)).filter((oppo: any) => oppo.isPlayAtHome).sort((a: any, b: any) => a.pot - b.pot);
    const awayTeams =  Array.from(this.allOpponents.get(team)).filter((oppo: any) => !oppo.isPlayAtHome).sort((a: any, b: any) => a.pot - b.pot);
    let orderedTeams: any[] = [];
    homeTeams.forEach((team, index) => {
      orderedTeams.push(team);
      orderedTeams.push(awayTeams[index]);

    });
    return orderedTeams;
  }

  getTeamsByPot(potNumber: number): any[] {
    const start = (potNumber - 1) * 9;
    const end = potNumber * 9;
    return Array.from(this.allOpponents.keys()).slice(start, end);
  }
  nextPot() {
    if (this.currentPot < this.totalPots) {
        this.currentPot++;
    }
  }

  prevPot() {
    if (this.currentPot > 1) {
        this.currentPot--;
    }
  }

}
