import { Component, OnInit, ViewChild } from '@angular/core';

import {PageSettingsModel } from '@syncfusion/ej2-angular-grids';
import { GroupService, SortService, GridComponent } from '@syncfusion/ej2-angular-grids';
import { ReceivableService } from '../receivable.service';

@Component({
  selector: 'app-cashlog',
  templateUrl: './cashlog.component.html',
  styleUrls: ['./cashlog.component.css']
})
export class CashlogComponent implements OnInit {

    public filter: Object;
    public filterSettings: Object;
	public groupOptions: Object;
	refresh: boolean;
	 public pageSettings: PageSettingsModel;
	 @ViewChild('grid')
    public grid: GridComponent;
	sales: any;
	reportdate: string;
	date1: Date;
	date2: Date;
  constructor(private recvSrv: ReceivableService) { }

  ngOnInit() {
		this.pageSettings = { pageSize: 25 };
        this.filterSettings = { type: "Menu" };      
        this.filter = { type: "CheckBox" };
		this.groupOptions = { showGroupedColumn: false, columns: ['USR'] };
  }

  	onDataBound() {
        if(this.refresh){
            this.grid.groupColumn('Country');
            this.refresh =false;
        }
	}

	getSales() {
		document.getElementById('seldate').style.display = "none";
		let dat1 = this.date1.toString();
		let dat2 = this.date2.toString();
		let sdate = "'" + dat1.substr(5,2) + "/" + dat1.substr(8,2) + "/" + dat1.substr(0,4) + "'";
		let edate = "'" + dat2.substr(5,2) + "/" + dat2.substr(8,2) + "/" + dat2.substr(0,4) + "'";
		this.reportdate = 'Reporting Period: '+sdate +' to '+edate;
		console.log('converted date', edate);

		this.recvSrv.fetchSales('/cashlog', sdate, edate)
		.subscribe(res => this.sales = res);
	}
}
