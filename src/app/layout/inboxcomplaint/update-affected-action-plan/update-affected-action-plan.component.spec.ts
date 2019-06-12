import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAffectedActionPlanComponent } from './update-affected-action-plan.component';

describe('UpdateAffectedActionPlanComponent', () => {
  let component: UpdateAffectedActionPlanComponent;
  let fixture: ComponentFixture<UpdateAffectedActionPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateAffectedActionPlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateAffectedActionPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
