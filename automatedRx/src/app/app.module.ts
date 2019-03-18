import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GridModule } from '@syncfusion/ej2-angular-grids';
import { StorageServiceModule} from 'angular-webstorage-service';
import { PageService, SortService, FilterService, GroupService } from '@syncfusion/ej2-angular-grids';
import { ChartsModule } from 'ng2-charts';

import { AppComponent } from './app.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { PayableService } from './payable.service';
import { ReceivableService } from './receivable.service';
import { SearchService } from './search.service';
import { PrintService } from './print.service';
import { LookupVendorComponent } from './lookup-vendor/lookup-vendor.component';
import { LookupItemComponent } from './lookup-item/lookup-item.component';
import { LookupPurchOrdComponent } from './lookup-purch-ord/lookup-purch-ord.component';
import { AppConfig } from './models/app-config';
import { MapItemsComponent } from './map-items/map-items.component';
import { BrowseStockComponent } from './browse-stock/browse-stock.component';
import { FilterPipe } from './filters/filter';
import { PinvoiceComponent } from './pinvoice/pinvoice.component';
import { ItemComponent } from './item/item.component';
import { AdditemComponent } from './additem/additem.component';
import { VendorQueryComponent } from './vendor-query/vendor-query.component';
import { ArInvoicesComponent } from './ar-invoices/ar-invoices.component';
import { SetupComponent } from './setup/setup.component';
import { AppServService } from './app-serv.service';
import { RunningTotalPipe } from './running-total.pipe';
import { StkmovementComponent } from './stkmovement/stkmovement.component';
import { StkcontrolComponent } from './stkcontrol/stkcontrol.component';
import { PointsaleComponent } from './pointsale/pointsale.component';
import { TenderedComponent } from './tendered/tendered.component';
import { ValuationComponent } from './valuation/valuation.component';
import { ScriptComponent } from './script/script.component';
import { LookupPatientComponent } from './lookup-patient/lookup-patient.component';
import { SalesOrderComponent } from './sales-order/sales-order.component';
import { LookupSorderComponent } from './lookup-sorder/lookup-sorder.component';
import { LookupCustomerComponent } from './lookup-customer/lookup-customer.component';
import { CusformComponent } from './cusform/cusform.component';
import { SalesReportComponent } from './sales-report/sales-report.component';
import { ScriptReportComponent } from './script-report/script-report.component';
import { CashlogComponent } from './cashlog/cashlog.component';
import { RxdaybookComponent } from './rxdaybook/rxdaybook.component';
import { GraphComponent } from './graph/graph.component';

@NgModule({
  declarations: [
    AppComponent,
    InvoiceComponent,
    LookupVendorComponent,
    LookupItemComponent,
    LookupPurchOrdComponent,
    MapItemsComponent,
    BrowseStockComponent,
	FilterPipe,
	PinvoiceComponent,
	ItemComponent,
	AdditemComponent,
	VendorQueryComponent,
	ArInvoicesComponent,
	SetupComponent,
	RunningTotalPipe,
	StkmovementComponent,
	StkcontrolComponent,
	PointsaleComponent,
	TenderedComponent,
	ValuationComponent,
	ScriptComponent,
	LookupPatientComponent,
	SalesOrderComponent,
	LookupSorderComponent,
	LookupCustomerComponent,
	CusformComponent,
	SalesReportComponent,
	ScriptReportComponent,
	CashlogComponent,
	RxdaybookComponent,
	GraphComponent
  ],
  imports: [
    BrowserModule,
	HttpClientModule,
	FormsModule,
	ReactiveFormsModule,
	StorageServiceModule,
	GridModule,
	ChartsModule,
    RouterModule.forRoot([
        {
           path: '',
           redirectTo: '/',
		   pathMatch: 'full'
        },
        {
           path: 'items',
           component: ItemComponent
        },
        {
           path: 'pinvoice',
           component: PinvoiceComponent
        },
        {
           path: 'invoice',
           component: InvoiceComponent
        },
		{
		path: 'mapping',
           component: MapItemsComponent
		},
		{
		path: 'invsummary',
           component: ArInvoicesComponent
		},
		{
		path: 'invpsummary',
           component: ArInvoicesComponent
		},
		{
		path: 'stkmove',
           component: StkmovementComponent
		},
		{
		path: 'stkvalu',
           component: ValuationComponent
		},
		{
		path: 'stkcontrol',
           component: StkcontrolComponent
		},
		{
		path: 'pointsale',
           component: PointsaleComponent,
		},
		{
		path: 'prescription',
           component: ScriptComponent,
		},
		{
			path: 'client',
			component: CusformComponent,
		},
		{
			path: 'salesorder',
			component: SalesOrderComponent,
		},
		{
			path: 'salesinvoice',
			component: InvoiceComponent,
		},
		{
			path: 'dailysales',
			component: SalesReportComponent,
		},
		{
			path: 'cashlog',
			component: CashlogComponent,
		},
		{
			path: 'daybook',
			component: RxdaybookComponent,
		},
		{
			path: 'rxsales',
			component: ScriptReportComponent,
		},
		{
			path: 'graph',
			component: GraphComponent,
		}
			
    ])
  ],
  providers: [PayableService, SearchService, AppConfig, PrintService, AppServService, ReceivableService, PageService, SortService, FilterService, GroupService],
  bootstrap: [AppComponent]
})
export class AppModule { }
