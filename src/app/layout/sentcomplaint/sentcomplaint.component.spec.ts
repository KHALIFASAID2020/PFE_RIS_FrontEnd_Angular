import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SentcomplaintComponent } from './sentcomplaint.component';

describe('SentcomplaintComponent', () => {
  let component: SentcomplaintComponent;
  let fixture: ComponentFixture<SentcomplaintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SentcomplaintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SentcomplaintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
