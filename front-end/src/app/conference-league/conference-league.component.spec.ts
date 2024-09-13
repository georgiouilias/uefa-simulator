import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConferenceLeagueComponent } from './conference-league.component';

describe('ConferenceLeagueComponent', () => {
  let component: ConferenceLeagueComponent;
  let fixture: ComponentFixture<ConferenceLeagueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConferenceLeagueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConferenceLeagueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
