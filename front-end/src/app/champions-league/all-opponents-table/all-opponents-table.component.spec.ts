import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllOpponentsTableComponent } from './all-opponents-table.component';

describe('AllOpponentsTableComponent', () => {
  let component: AllOpponentsTableComponent;
  let fixture: ComponentFixture<AllOpponentsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllOpponentsTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllOpponentsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
