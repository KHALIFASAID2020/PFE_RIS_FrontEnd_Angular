import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupcongratulationsComponent } from './groupcongratulations.component';

describe('GroupcongratulationsComponent', () => {
  let component: GroupcongratulationsComponent;
  let fixture: ComponentFixture<GroupcongratulationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupcongratulationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupcongratulationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
