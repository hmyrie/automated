import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LookupVendorComponent } from './lookup-vendor.component';

describe('LookupVendorComponent', () => {
  let component: LookupVendorComponent;
  let fixture: ComponentFixture<LookupVendorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LookupVendorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LookupVendorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
