import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainementActionsComponent } from './containement-actions.component';

describe('ContainementActionsComponent', () => {
  let component: ContainementActionsComponent;
  let fixture: ComponentFixture<ContainementActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContainementActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainementActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
