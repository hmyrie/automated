import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenderedComponent } from './tendered.component';

describe('TenderedComponent', () => {
  let component: TenderedComponent;
  let fixture: ComponentFixture<TenderedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenderedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenderedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
