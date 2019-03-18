import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RxdaybookComponent } from './rxdaybook.component';

describe('RxdaybookComponent', () => {
  let component: RxdaybookComponent;
  let fixture: ComponentFixture<RxdaybookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RxdaybookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RxdaybookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
