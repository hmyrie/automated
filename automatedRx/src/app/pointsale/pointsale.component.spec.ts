import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PointsaleComponent } from './pointsale.component';

describe('PointsaleComponent', () => {
  let component: PointsaleComponent;
  let fixture: ComponentFixture<PointsaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PointsaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PointsaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
