import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { SingleDataSet, Label } from 'ng2-charts';

import { ReceivableService } from '../receivable.service';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {

	public barChartOptions: ChartOptions = {
		responsive: true,
	};
	public pieChartOptions: ChartOptions = {
		responsive: true,
	};
	reports = ["Monthly Sales", "By Pay Method", "Monthly Purchases"];
	today: Date = new Date();
	max_year = this.today.getFullYear();
	ryear = this.max_year;
  public pieChartLabels: Label[] = [];
  public pieChartType: ChartType = 'pie';
  public pieChartData: SingleDataSet = [];
//  public pieChartLabels: Label[] = [];
  public pieChartLegend = true;
  public pieChartPlugins = [];
  public barChartLabels: Label[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];
  public barChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
  ];
  constructor(private recv: ReceivableService) { }

  ngOnInit() {
  }

  onSelect(opt) {
	  document.getElementById("modal").style.display = "none";
	  console.log(opt)
  }
  
  getResult(opt, rep) {
	  document.getElementById("modal").style.display = "none";
	  console.log(opt)
	  console.log(rep)
	  this.barChartLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	  document.getElementById("ripple").style.display = "inline-block";
	  if (rep === "Monthly Purchases") 
		  this.getPurchases(opt);
      if (rep === "Monthly Sales") 
	      this.getSales(opt);
      if (rep === "By Pay Method") 
	      this.getPayMethod(opt);
  }
  
	getSales(yer) {
	  this.recv.fetchGraph('/salesdata', yer)
	  .subscribe(res => this.parseData(res, "Sales"),
	  (err) => this.errMsg(err) )
	}
 
	getPayMethod(yer) {
	  this.recv.fetchGraph('/paymethod', yer)
	  .subscribe(res => this.parseData2(res, "Payment Method"),
	  (err) => this.errMsg(err) )
    }
 
 	getPurchases(yer) {
	  this.recv.fetchGraph('/purchdata', yer)
	  .subscribe(res => this.parseData(res, "Purchases"),
	  (err) => this.errMsg(err) )
    }

	parseData(res, lbl) {
	  this.barChartData.length = 0;
	  this.barChartData = [];
	  console.log(res);
	  let ary1 = [0,0,0,0,0,0,0,0,0,0,0,0];
	  let ary2 = [0,0,0,0,0,0,0,0,0,0,0,0];
	  let i = 0;
	  let j = 0;
	  for (i=0; i<res.length; i++) {
		  j = res[i].MTH - 1;
		  ary1[j] = res[i].CNT1;
		  if(res[i].hasOwnProperty('SALE')){
			ary2[j] = res[i].SALE;
		  }
		  if(res[i].hasOwnProperty('PURCH')){
			ary2[j] = res[i].PURCH;
		  }
		  if(res[i].hasOwnProperty('PURCH')){
			ary2[j] = res[i].PAYMETHOD;
		  }
	  }
	  let data1 = { data: ary1, label: 'Transactions'};
	  let data2 = { data: ary2, label: lbl};
	  this.barChartData.push(data1);
	  this.barChartData.push(data2);
	  console.log(this.barChartData);
	  // this.barChartData = { data: [65, 59, 80, 81, 56, 55, 40], label: 'Transactions' }
	  document.getElementById("ripple").style.display = "none";
  }
	parseData2(res, lbl) {
	  this.pieChartData.length = 0;
	  this.pieChartData = [];
	  console.log(res);
	  let ary1 = [];
	  let ary2 = [];
	  let ary3 = [];
	  let i = 0;
	  let j = 0;
	  for (i=0; i<res.length; i++) {
		  ary1.push(res[i].PAYMETHOD);
		  ary2.push(res[i].SALE1);
		  ary3.push(res[i].CNT1);
	  }
	  let data1 = { data: ary1, label: 'Pay Method'};
	  let data2 = { data: ary3, label: lbl};
	  this.pieChartLabels = ary1;
	  this.pieChartData.push(data2);
//	  this.pieChartData.push(ary2);
	  // this.barChartData = { data: [65, 59, 80, 81, 56, 55, 40], label: 'Transactions' }
	  document.getElementById("ripple").style.display = "none";
	  document.getElementById("barchart").style.display = "none";
	  document.getElementById("piechart").style.display = "block";
  }
  
  errMsg(err) {
	  document.getElementById("ripple").style.display = "none";
  }
}
