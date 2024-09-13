import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaguePhaseDrawComponent } from './league-phase-draw.component';

describe('LeaguePhaseDrawComponent', () => {
  let component: LeaguePhaseDrawComponent;
  let fixture: ComponentFixture<LeaguePhaseDrawComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeaguePhaseDrawComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeaguePhaseDrawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
