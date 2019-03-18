import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReceivableService } from '../receivable.service';

import { SOrderLine } from '../models/sorderline';

@Component({
  selector: 'app-sales-order',
  templateUrl: './sales-order.component.html',
  styleUrls: ['./sales-order.component.css']
})
export class SalesOrderComponent implements OnInit {

	popCustomer: boolean;
	popItems: boolean;
	isNew: boolean = false;
	canSave: boolean = false;
	soNum = 0;
	OrderLines: Array<SOrderLine> = [];
	subTotal = 0.0;
	runningTot = 0.0;
	CusId ="";
	summ = false;
	counter = 0;
	prv_counter = 0;
	cmpy: any;
	today = new Date();
	sdate = (this.today.getMonth() +1) + "/" + this.today.getDate() + "/" + this.today.getFullYear();
	saledate = this.sdate;
	cust = {name: "", contact: "", addr1: "", addr2: "", phone: ""};
	sorder = {orderno: 0, custno: "", saledate: this.saledate, shipdate: '', empno: 0, shipcontact: "", shipaddr1: "", 
	         shipaddr2: "", shipcity: "", shipstate: "", shipzip: "", shipcountry: "", shipphone: "", shipvia: "",
			 po: "", terms: "COD", paymethod: "Cheque", itemstotal: 0, taxrate: 0, freight: 0, invoiced: "N", invoiceno: 0,
			 subtotal: 0, discount: 0, tax: 0};
  constructor(private recvSrv: ReceivableService, private router: Router) { }

  ngOnInit() {
	  this.cmpy = this.recvSrv.getCompany();
  }

	newOrder() {
		this.popCustomer = true;
		this.isNew = true;
	}
	
	newLine() {
		this.popItems = true;
	}
	
	printOrder() {
		window.print();
	}
	
	cancelOrder() {
		this.cust.name = "";
		this.cust.contact = "";
		this.cust.phone = "";
		this.cust.addr1 = "";
		this.cust.addr2 = "";
		this.sorder.custno = "";
		this.sorder.shipcontact = "";
		this.sorder.shipaddr1 = "";
		this.sorder.itemstotal = 0;
		this.sorder.subtotal = 0;
		this.isNew = false;
	}
	
	saveOrder() {
		this.isNew = true;
		this.recvSrv.postData('/SOHdr', this.sorder)
		.subscribe(res => this.postLines(),
		(err) => this.saveError(err)
		)
	}
	
	postLines() {
		this.recvSrv.postData('/SODet', this.OrderLines)
		.subscribe(res => this.saveOK())
	}
	
	saveOK() {
		alert('Saved Successfully');
		this.canSave = false;
		this.isNew = true;
		this.OrderLines.length = 0;
		this.OrderLines = [];
		this.cancelOrder();
	}
	
	saveError(err) {
		this.isNew = false;
		alert(err);
	}
	
	closeCustomerView(nQuery) {
		this.popCustomer = false;
		console.log(nQuery);
		this.cust.name = nQuery.CLI_NAME;
		this.cust.contact = nQuery.CLI_CONTACT;
		this.cust.phone = nQuery.CLI_TEL;
		this.cust.addr1 = nQuery.CLI_ADR1;
		this.cust.addr2 = nQuery.CLI_ADR2;
		this.sorder.custno = nQuery.CLI_CODE;
		this.sorder.shipcontact = nQuery.CLI_CONTACT;
		this.sorder.shipaddr1 = nQuery.CLI_ADR1;
		this.sorder.shipdate = this.saledate;
		if (this.soNum === 0)
			this.getSalesOrderNo();
	}
	
	addItem() {
		this.popItems = true;
	}

	getSalesOrderNo() {
		this.recvSrv.fetchData('/sonum')
		.subscribe(res => this.assignNo(res),
		(err) => this.soNum = 0,
		)
	}
	
	assignNo(res) {
		this.soNum = res[0].PONUMBER;
		this.sorder.orderno = res[0].PONUMBER;
	}
	
	closeItemView(newQuery) {
		this.popItems = false;
		console.log(newQuery);
		let line = {description: newQuery.DESCRIPTION, orderno:this.soNum, itemno: newQuery.PRODUCT, partno: newQuery.PRODUCT, quantity: 1,
		         discount: 0, price: newQuery.PRICE, taxcode: newQuery.TAXCODE, ordered: 1, invoice: '0', extended: newQuery.PRICE};
	
		this.OrderLines.push(line);
		this.calcTotals();
		this.canSave = true;
	}
	
	calcLine(line, i) {
	//	document.getElementById('scanId').focus();
		let extend = line.ordered * line.price;
	//	document.getElementById(id).blur();
		this.OrderLines[i].extended = extend;
		this.calcTotals();
	}
	
	calcTotals() {
		let total = 0;
		let i = 0;
		for (i=0; i<this.OrderLines.length;i++) {
			total = total + (this.OrderLines[i].extended);
		}
		this.sorder.subtotal = total;
		this.sorder.itemstotal = total;
		
	}
	
	closeOrder() {
		this.router.navigate(['']);
	}
	
	delRecord(i) {
		console.log('delete ', i);
		let array = [];
		let j = 0;
		for (j=0; j < this.OrderLines.length; j++) {
			if (j != i)
			array.push(this.OrderLines[j]);
		}
		this.OrderLines = array;
		this.calcTotals();
		
	}
}
