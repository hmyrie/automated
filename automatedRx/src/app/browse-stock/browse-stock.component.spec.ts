import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseStockComponent } from './browse-stock.component';

describe('BrowseStockComponent', () => {
  let component: BrowseStockComponent;
  let fixture: ComponentFixture<BrowseStockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrowseStockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowseStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
