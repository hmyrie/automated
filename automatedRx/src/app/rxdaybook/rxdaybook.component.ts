import { Component, OnInit } from '@angular/core';

import {PageSettingsModel } from '@syncfusion/ej2-angular-grids';
import { GroupService, SortService, GridComponent } from '@syncfusion/ej2-angular-grids';
import { ReceivableService } from '../receivable.service';

@Component({
  selector: 'app-rxdaybook',
  templateUrl: './rxdaybook.component.html',
  styleUrls: ['./rxdaybook.component.css']
})
export class RxdaybookComponent implements OnInit {

    public filter: Object;
    public filterSettings: Object;
	public groupOptions: Object;
	refresh: boolean;
	public pageSettings: PageSettingsModel;
	scripts: any;
	reportdate: string;
	date1: Date;
	date2: Date;
  constructor(private recvSrv: ReceivableService) { }

  ngOnInit() {
		this.pageSettings = { pageSize: 25 };
        this.filterSettings = { type: "Menu" };      
        this.filter = { type: "CheckBox" };
		this.groupOptions = { showGroupedColumn: false, columns: ['SDATE'] };
  }
  
  	getScripts() {
		let dat1 = this.date1.toString();
		let dat2 = this.date2.toString();
		let sdate = "'" + dat1.substr(5,2) + "/" + dat1.substr(8,2) + "/" + dat1.substr(0,4) + "'";
		let edate = "'" + dat2.substr(5,2) + "/" + dat2.substr(8,2) + "/" + dat2.substr(0,4) + "'";
		this.reportdate = 'Reporting Period: '+sdate +' to '+edate;
		console.log('edate ', edate);
		this.recvSrv.fetchSales('/daybook', sdate, edate)
		.subscribe(res => this.scripts = res);
	}

}
