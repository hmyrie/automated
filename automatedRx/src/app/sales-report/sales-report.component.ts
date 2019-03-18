import { Component, OnInit } from '@angular/core';

import { ReceivableService } from '../receivable.service';

@Component({
  selector: 'app-sales-report',
  templateUrl: './sales-report.component.html',
  styleUrls: ['./sales-report.component.css']
})
export class SalesReportComponent implements OnInit {

	date1: Date = new Date();
	date2: Date = new Date();
	reportdate: string;
	sales = {cogs: 0, disc: 0, exempt: 0, subtotal: 0, tax: 0, taxable: 0, zero: 0, vol: 0, uncash: 0,
	      cashed: 0, artot: 0, insurance: 0, ret_amt: 0, ret_tax: 0, cashtot: 0, uncashtot: 0, 
		  cash_disc: 0, cash_tax: 0};
  constructor(private recvSrv: ReceivableService) { }

  ngOnInit() {
  }

	runReport() {
		document.getElementById('seldate').style.display = "none";
		let dat1 = this.date1.toString();
		let dat2 = this.date2.toString();
		console.log(this.date1.toString());
		let sdate = "'" + dat1.substr(5,2) + "/" + dat1.substr(8,2) + "/" + dat1.substr(0,4) + "'";
		let edate = "'" + dat2.substr(5,2) + "/" + dat2.substr(8,2) + "/" + dat2.substr(0,4) + "'";
		this.reportdate = 'Reporting Period: '+sdate +' to '+edate;
		console.log('converted date', edate);

		this.recvSrv.fetchSales('/salesreport', sdate, edate)
		.subscribe(res => this.process(res));
	}
	
	process(res) {
		this.sales.cogs = res[0].COSTGOODS;
		this.sales.disc = res[0].DISCOUNT;
		this.sales.exempt = res[0].EXEMPTED;
		this.sales.subtotal = res[0].SUBTOTAL;
		this.sales.tax = res[0].TAX;
		this.sales.taxable = res[0].TAXABLE;
		this.sales.zero = res[0].ZERO;
		this.sales.vol = res[0].VOL;
		this.sales.uncash = res[0].UNCSH;
		this.sales.cashed = res[0].CSHED;
		this.sales.artot = res[0].AR_TOT;
		this.sales.insurance = res[0].INSURE;
		this.sales.ret_amt = res[0].RET_AMT;
		this.sales.ret_tax = res[0].RET_TAX;
		this.sales.cashtot = res[0].CSH_TOT;
		this.sales.uncashtot = res[0].UNCSH_TOT;
		this.sales.cash_disc = res[0].CSH_DISC;
		this.sales.cash_tax = res[0].CSH_TAX;
	//	this.sales. = res[0].;
	}
	
	getPeriod() {
		document.getElementById('seldate').style.display = "block";
	}
	
	printReport() {
		window.print();
	}
}
