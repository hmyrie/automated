import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorQueryComponent } from './vendor-query.component';

describe('VendorQueryComponent', () => {
  let component: VendorQueryComponent;
  let fixture: ComponentFixture<VendorQueryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorQueryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorQueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
