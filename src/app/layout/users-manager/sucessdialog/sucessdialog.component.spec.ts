import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SucessdialogComponent } from './sucessdialog.component';

describe('SucessdialogComponent', () => {
  let component: SucessdialogComponent;
  let fixture: ComponentFixture<SucessdialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SucessdialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SucessdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
