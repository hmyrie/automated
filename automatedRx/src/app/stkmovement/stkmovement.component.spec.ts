import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StkmovementComponent } from './stkmovement.component';

describe('StkmovementComponent', () => {
  let component: StkmovementComponent;
  let fixture: ComponentFixture<StkmovementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StkmovementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StkmovementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
