import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogfaultsComponent } from './catalogfaults.component';

describe('CatalogfaultsComponent', () => {
  let component: CatalogfaultsComponent;
  let fixture: ComponentFixture<CatalogfaultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatalogfaultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogfaultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
