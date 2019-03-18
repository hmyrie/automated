import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LookupSorderComponent } from './lookup-sorder.component';

describe('LookupSorderComponent', () => {
  let component: LookupSorderComponent;
  let fixture: ComponentFixture<LookupSorderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LookupSorderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LookupSorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
