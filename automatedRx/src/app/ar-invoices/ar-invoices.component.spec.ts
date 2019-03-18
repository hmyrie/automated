import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArInvoicesComponent } from './ar-invoices.component';

describe('ArInvoicesComponent', () => {
  let component: ArInvoicesComponent;
  let fixture: ComponentFixture<ArInvoicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArInvoicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArInvoicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
