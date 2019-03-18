import { Component, OnInit } from '@angular/core';

import { PosLine } from '../models/posline';
import { ListItem } from '../models/listitem';
import { ReceivableService } from '../receivable.service';
import { PrintService } from '../print.service';
@Component({
  selector: 'app-pointsale',
  templateUrl: './pointsale.component.html',
  styleUrls: ['./pointsale.component.css']
})
export class PointsaleComponent implements OnInit {

  constructor(private recvSrv: ReceivableService, private zprint: PrintService) { }

  scan: string = "";
  lineItems: PosLine[];
  itemList: ListItem[];
  popTender: boolean = false;
  is_posted: boolean = true;
  is_normal: boolean = true;
  print_ready: boolean = false;
  functionName: string = "";
  receiptNo = 0;
  today: Date = new Date();
  sdate = (this.today.getMonth() +1) + "/" + this.today.getDate() + "/" + this.today.getFullYear();
  saledate = "'"+this.sdate+"'";
  saletime = "'"+this.today.getHours()+":"+ this.today.getMinutes() +":" + this.today.getSeconds()+"'";
  sales = {receipt: 0, saledate: this.saledate, saletime: this.saletime, subtotal: 0, discount: 0, tax: 0, total: 0,
          saletype: '', usr: "''", exempted: 0, payment: 0, orderno: 0, paymode: 'CASH', name: "''", address: "''",
		  chargeac: "''", cardnumber: "''", invoice: 0, status: "''", rxtotal: 0, rxno: 0, taxable: 0, zero: 0,
		  customer: "''", payacc: 0, costgoods: 0, exrate: 1, paymode2: "'N/A'", payamt2: 0, payacc2: 0, tax2: 0}
	payout = {payee: "", amount: 0};
	
  ngOnInit() {
	  this.lineItems = [];
	  setTimeout(()=> { document.getElementById('scanId').focus() }, 10);
	  this.zprint.override();
  }

	toggle(z) {
		var side = document.getElementById('scanx');
		var main = document.getElementById('mainWin');
		var txt1 = document.getElementById('scanId');
		var txt2 = document.getElementById('qtyId');
		var btnbsk = document.getElementById('bskp-btn');
		var btnzero = document.getElementById('zero-btn');
		var btnenter = document.getElementById('enter-btn');
		var btnnumber = document.getElementById('number-btn');
		if(z == "2") {
			side.style.width = "40%";
			main.style.width = "60%";
			main.style.marginLeft = "40%";
			if(window.matchMedia('(max-width: 320px)').matches){           
				side.style.width = "100%";
				txt1.style.width = "97%";
				txt2.style.width = "97%";
				btnbsk.style.width = "45%";
				btnzero.style.width = "44%";
				btnenter.style.width = "95%";
				btnnumber.style.width = "27.5% !important";
			}
		}
		else {
			side.style.width = "0";
			main.style.width = "100%";
			main.style.marginLeft = "0";
	    	if (!this.print_ready) {
				this.print_ready = true;
				this.zprint.getPrinters();
				console.log('printing launched');
			}
		}
	} 

	closeBtn() {
		document.getElementById('action').style.width = "0%";
	}
	
	showButtons() {
		let content = document.getElementById('btns');
		if (content.style.display === "block"){
			content.style.display = "none";
		} else {
			content.style.display = "block";
		} 
		if (!this.print_ready) {
			this.print_ready = true;
			this.zprint.launchQZ();
			console.log('printing launched');
		}
	}
	
    tender() {
		if (this.is_normal) {
			this.popTender = true;
		}
		else {
			this.sales.payment = this.payout.amount * -1;
			this.sales.saletype = "'JAD'";
			this.sales.paymode = "'Payout'";
			if (this.functionName === 'loan')
				this.sales.paymode = 'Loan';
			this.is_normal = true;
			this.getSaleNo();
		}
	}
  

	numb(x) {
		if (this.scan.length === 0)
			this.scan = x;
		else {
			const j = this.scan;
			this.scan = j.concat(x);
		}
	}
	
	backSp() {
		if (this.scan.length > 0) {
		//	var str = "12345.00";
			this.scan = this.scan.slice(0, -1); // "12345.0"
		}
	}
	
	lookupItem() {
		let trm = '';
		if (this.scan.length > 8)
			trm = 'B';
		this.recvSrv.getItem('/item', this.scan, trm)
		.subscribe((res) => {this.itemList = res, this.initialz()},
		(err) => console.log(err),
		() => console.log("OK")
		)
	}
	
	initialz() {
		//document.getElementById('qtyId').focus();
		this.sales.payment = 0;
		this.sales.subtotal = 0;
		this.sales.total = 0;
		this.sales.exempted = 0;
	}
	
	grantAccess(fnct) {
		this.openDialog('secure');
		this.functionName = fnct;
	}
	
	authorize(usr) {
		console.log(usr);
		this.closeDialog('secure');
		// process code ====
		(<HTMLInputElement>document.getElementById('userId')).value = "";
		let fnc = this.functionName;
		if (fnc === 'loan')
			 fnc = 'payout';
		 if (fnc === 'reprint')
			 this.printBill();
		 else
		this.openDialog(fnc);
	}
	
	addLine(item) {
		if (item) {
			let lin = {receipt: 1, prodno: item.PRODUCT, description: item.DESCRIPTION, price: item.PRICE, qty: item.QOH, extended: (item.QOH * item.PRICE),
			tax: 0, discount: 0, status: 'N', percent: 0, script: 0, rxcost: 0, prodkey: item.PRODKEY, cogs: item.COST, cost: item.COST};
			this.lineItems.push(lin);
			this.scan = '';
			this.itemList = [];
			this.computeTotals();
			this.is_posted = false;
		}
	}
	
	editQty(id) {
		 document.getElementById(id).contentEditable = "true";
	}
	
	calcLine(line, id) {
		document.getElementById('scanId').focus();
		let extend = line.qty * line.price;
		document.getElementById(id).blur();
		this.lineItems[id].extended = extend;
	}
	
	computeTotals() {
		let total = 0;
		let i = 0;
		for (i=0; i<this.lineItems.length;i++) {
			total = total + (this.lineItems[i].extended);
		}
		this.sales.subtotal = total;
		this.sales.total = total;
	}
	
    closeModal(newQuery) {
		this.popTender = false;
		console.log(newQuery);
		this.sales.payment = newQuery.amount;
		this.sales.saletype = "'"+newQuery.currency+"'";
		this.sales.paymode = "'"+newQuery.paymode+"'";
		this.getSaleNo();
	}
	
	getSaleNo() {
		this.recvSrv.getReceipt()
		.subscribe(res => {
			this.receiptNo = res[0].SALNO;
			this.sales.receipt = res[0].SALNO;
			this.postSales();
		});
	}
			
	postSales() {
		console.log(this.sales);
		this.recvSrv.saveSales('/sales', this.sales)
		.subscribe(res => { console.log(res); 
		this.postSalesD() },
		(err) => {
			console.log(err.error);
			console.log(err.name);
			console.log(err.message);
			console.log(err.status);
		}
		);
	}
	
	postSalesD() {
		let i = 0;
		this.is_posted = true;
		for (i=0; i < this.lineItems.length; i++) {
			this.lineItems[i].receipt = this.receiptNo;
		}
		this.recvSrv.saveSales('/salesdetail', this.lineItems)
		.subscribe(res => this.newTrans(),
		(err) => {
			console.log(err.error);
		});
	}
	
	openNav() {
		document.getElementById("rtSidenav").style.width = "150px";
	}
	closeNav() {
		document.getElementById("rtSidenav").style.width = "0";
	}
	
	newTrans() {
		this.lineItems = <PosLine[]>[];
	//	this.sales = [];
		document.getElementById('scanId').focus();
	}
	
	zapLine(idx) {
		this.lineItems.splice(idx);
		this.computeTotals();
		this.is_posted = (this.lineItems.length === 0);
	}
	
	refund() {
		this.openDialog('refund');
	}
	
	closeRefund() {
		this.closeDialog('refund');
	}
		
	acceptPay() {
		this.closeDialog('payout');
		let amt = this.payout.amount * -1;
		let lin = {receipt: 0, prodno: 0, description: this.payout.payee, price: amt, qty: 1, extended: amt,
		tax: 0, discount: 0, status: 'N', percent: 0, script: 0, rxcost: 0, prodkey: '0', cogs: 0, cost: 0};
		this.lineItems.push(lin);
		this.computeTotals();
		this.is_posted = false;
		this.is_normal = false;
	}
	
	openDrawer() {
		this.closeDialog('drawer');
	}
	
	openDialog(which) {
		var modal = document.getElementById(which);
		modal.style.display = "block";
	}
		
	closeDialog(which) { 
		var modal = document.getElementById(which);
		modal.style.display = "none";
	}
	
	printBill() {
	//	this.zprint.getPrinters()
	//	.subscribe(res => console.log(res));
		this.zprint.findDefaultPrinter(false); //showDefault();
	}

}