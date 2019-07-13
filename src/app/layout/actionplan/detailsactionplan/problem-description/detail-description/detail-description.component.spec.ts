import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailDescriptionComponent } from './detail-description.component';

describe('DetailDescriptionComponent', () => {
  let component: DetailDescriptionComponent;
  let fixture: ComponentFixture<DetailDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailDescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
