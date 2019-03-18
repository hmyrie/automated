import { Component, OnInit } from '@angular/core';

import {PageSettingsModel } from '@syncfusion/ej2-angular-grids';
//import { GroupService, SortService, GridComponent } from '@syncfusion/ej2-angular-grids';
import { ReceivableService } from '../receivable.service';

@Component({
  selector: 'app-script-report',
  templateUrl: './script-report.component.html',
  styleUrls: ['./script-report.component.css']
})
export class ScriptReportComponent implements OnInit {

    public filter: Object;
    public filterSettings: Object;
	refresh: boolean;
	 public pageSettings: PageSettingsModel;
//	 @ViewChild('grid')
//    public grid: GridComponent;
	reportdate: string;
	date1: Date;
	date2: Date;
	scripts: any;
  constructor(private recvSrv: ReceivableService) { }

  ngOnInit() {
		this.pageSettings = { pageSize: 20 };
        this.filterSettings = { type: "Menu" };      
        this.filter = { type: "CheckBox" };
	//	this.groupOptions = { showGroupedColumn: false, columns: ['USR'] };
  }

  
  	getScripts() {
		let dat1 = this.date1.toString();
		let dat2 = this.date2.toString();
		let sdate = "'" + dat1.substr(5,2) + "/" + dat1.substr(8,2) + "/" + dat1.substr(0,4) + "'";
		let edate = "'" + dat2.substr(5,2) + "/" + dat2.substr(8,2) + "/" + dat2.substr(0,4) + "'";
		this.reportdate = 'Reporting Period: '+sdate +' to '+edate;

		this.recvSrv.fetchSales('/scripts', sdate, edate)
		.subscribe(res => this.scripts = res);
	}
}
