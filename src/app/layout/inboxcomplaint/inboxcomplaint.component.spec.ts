import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InboxcomplaintComponent } from './inboxcomplaint.component';

describe('InboxcomplaintComponent', () => {
  let component: InboxcomplaintComponent;
  let fixture: ComponentFixture<InboxcomplaintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InboxcomplaintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InboxcomplaintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
