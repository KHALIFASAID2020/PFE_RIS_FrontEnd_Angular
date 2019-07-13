import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailActionReceivedComponent } from './detail-action-received.component';

describe('DetailActionReceivedComponent', () => {
  let component: DetailActionReceivedComponent;
  let fixture: ComponentFixture<DetailActionReceivedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailActionReceivedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailActionReceivedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
