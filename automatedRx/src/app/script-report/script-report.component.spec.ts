import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScriptReportComponent } from './script-report.component';

describe('ScriptReportComponent', () => {
  let component: ScriptReportComponent;
  let fixture: ComponentFixture<ScriptReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScriptReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScriptReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
