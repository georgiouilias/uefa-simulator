import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private _pots: any[][] = [];
  private allOpponents: Map<any, any> = new Map<any, any>();

  get pots(): any[][] {
    return this._pots;
  }

  set pots(value: any[][]) {
    this._pots = value;
  }

  setAllOpponents(opponents: Map<any, any>) {
    this.allOpponents = opponents;
  }

  getAllOpponents(): Map<any, any> {
    return this.allOpponents;
  }

}
