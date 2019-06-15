import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsactionplanComponent } from './detailsactionplan.component';

describe('DetailsactionplanComponent', () => {
  let component: DetailsactionplanComponent;
  let fixture: ComponentFixture<DetailsactionplanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsactionplanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsactionplanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
