import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalysisTeamComponent } from './analysis-team.component';

describe('AnalysisTeamComponent', () => {
  let component: AnalysisTeamComponent;
  let fixture: ComponentFixture<AnalysisTeamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalysisTeamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalysisTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
