import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreventiveActionsComponent } from './preventive-actions.component';

describe('PreventiveActionsComponent', () => {
  let component: PreventiveActionsComponent;
  let fixture: ComponentFixture<PreventiveActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreventiveActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreventiveActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
