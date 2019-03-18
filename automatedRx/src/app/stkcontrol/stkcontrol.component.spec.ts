import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StkcontrolComponent } from './stkcontrol.component';

describe('StkcontrolComponent', () => {
  let component: StkcontrolComponent;
  let fixture: ComponentFixture<StkcontrolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StkcontrolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StkcontrolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
