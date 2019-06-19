import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewoftheeffectivenessComponent } from './reviewoftheeffectiveness.component';

describe('ReviewoftheeffectivenessComponent', () => {
  let component: ReviewoftheeffectivenessComponent;
  let fixture: ComponentFixture<ReviewoftheeffectivenessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewoftheeffectivenessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewoftheeffectivenessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
