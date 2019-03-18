import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LookupPurchOrdComponent } from './lookup-purch-ord.component';

describe('LookupPurchOrdComponent', () => {
  let component: LookupPurchOrdComponent;
  let fixture: ComponentFixture<LookupPurchOrdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LookupPurchOrdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LookupPurchOrdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
