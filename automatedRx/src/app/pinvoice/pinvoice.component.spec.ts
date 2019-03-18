import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PinvoiceComponent } from './pinvoice.component';

describe('PinvoiceComponent', () => {
  let component: PinvoiceComponent;
  let fixture: ComponentFixture<PinvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PinvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PinvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
