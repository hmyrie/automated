import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LookupCustomerComponent } from './lookup-customer.component';

describe('LookupCustomerComponent', () => {
  let component: LookupCustomerComponent;
  let fixture: ComponentFixture<LookupCustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LookupCustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LookupCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
