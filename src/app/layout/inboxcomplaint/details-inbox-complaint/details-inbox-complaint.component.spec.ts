import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsInboxComplaintComponent } from './details-inbox-complaint.component';

describe('DetailsInboxComplaintComponent', () => {
  let component: DetailsInboxComplaintComponent;
  let fixture: ComponentFixture<DetailsInboxComplaintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsInboxComplaintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsInboxComplaintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
