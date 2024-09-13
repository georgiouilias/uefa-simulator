import { Routes } from '@angular/router';
import { ChampionsLeagueComponent } from './champions-league/champions-league.component';
import { EuropaLeagueComponent } from './europa-league/europa-league.component';
import { ConferenceLeagueComponent } from './conference-league/conference-league.component';
import { MainPageComponent } from './main-page/main-page.component';
import { LeaguePhaseDrawComponent } from './champions-league/league-phase-draw/league-phase-draw.component';
import { AllOpponentsTableComponent } from './champions-league/all-opponents-table/all-opponents-table.component';
import { StandingsTableComponent } from './champions-league/standings-table/standings-table.component';

export const routes: Routes = [
  {
    path: 'champions-league',
    children: [
      { path: '', component: ChampionsLeagueComponent },
      { path: 'league-phase-draw', component: LeaguePhaseDrawComponent },
      { path: 'all-opponents-table', component: AllOpponentsTableComponent },
      { path: 'standings-table', component: StandingsTableComponent },
    ]
  },
  { path: 'europa-league', component: EuropaLeagueComponent },
  { path: 'conference-league', component: ConferenceLeagueComponent },
  { path: '', component: MainPageComponent },
  { path: '', redirectTo: '/', pathMatch: 'full' },  // Default route
  { path: '**', redirectTo: '/' }  // Wildcard route in case of unknown routes
];
