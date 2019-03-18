import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { ReceivableService } from '../receivable.service';
import { PrintService } from '../print.service';

import { LookupCustomerComponent } from '../lookup-customer/lookup-customer.component';
import { SinvLine } from '../models/sinvline';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {
	@ViewChild('printEl') printEl: ElementRef;

  isAuto: boolean = false;  
  isNew: boolean = true;
  canSave: boolean = false;
  itemsList: Array<SinvLine> = [];
  custID: string = '';
  btn_label: string = 'New';
  cmpy: any;
  seq = 0;
  salesNo = 0;
  
  salesInv = {number: 0, idate: new Date(), code: "S242", status: "New", name: "",
             term: "30 days", customer: "", address: "", address2: "", contact: "",
			 tax: 0.00, seq: 1, total: 0.00, ref: "", type: '1', salesman: "",
			 subtotal: 0.00, discount: 0, source: "O", duedate: '', invdate: "", 
			 exempted: 0, zero: 0, itime: "", stype: "JAD", orderno: 0, paymode: "Charge",
			 cardnumber: "", invoice: 0, taxable: 0, payacc: 0, payacc2: 0, paymode2: "",
			 payamt2: 0};
  status: string = "New";
  terms = ["COD", "Net 15", "Net 30"];
  popCustomer: boolean = false;
  popItems: boolean = false;
  constructor(public recvSrv: ReceivableService, public printSrv: PrintService, private router: Router) { }

  ngOnInit() {
	  this.cmpy = this.recvSrv.getCompany();
  }

  lookupCustomer() {
    this.popCustomer = true;
	this.isNew = true;
  }
  
  lookupPO() {
	  
  }
  
    updateInv() {
		//this.salesInv.number = document.getElementById("invno").innerHTML;
	}
	
	getSalesNo() {
		this.recvSrv.fetchData('/newsalesinvoice')
		.subscribe(res => this.newSales(res),
		(err) => console.log(err)
	    )
		
	}
	
	newSales(res) {
		this.salesNo = res[0].SALNO;
		this.salesInv.number = res[0].SALNO;;
	}
	
	closeModal(newCustomer) {
		this.popCustomer = false;
		if (newCustomer) {
			this.btn_label = 'Customer';
			this.salesInv.code = newCustomer.CLI_CODE;
			this.salesInv.customer = newCustomer.CLI_NAME;
			this.salesInv.address = newCustomer.CLI_ADR1;
			this.salesInv.contact = newCustomer.CLI_CONTACT;
			this.custID = newCustomer.CLI_CODE;
			this.isNew = false;
			let dater = this.salesInv.idate.getMonth()+'/'+this.salesInv.idate.getDate()+'/'+this.salesInv.idate.getFullYear();
			this.salesInv.invdate = dater;
			this.salesInv.duedate = dater;
			if (this.salesNo === 0)
				this.getSalesNo();
		}
	}
  
	addItem() {
		if (this.salesInv.number > 0)
			this.popItems = true;
		else
			alert('Enter invoice number');
	}
	
	updateQty(i) {
		this.itemsList[i].extended = this.itemsList[i].quantity * this.itemsList[i].price;
		this.sumTotal();
	}
	
	updatePrice(i) {
		
	}
	
	changeTerm(val) {
		let add = 0;
		if (val === 'COD')
			this.salesInv.duedate = this.salesInv.invdate;
		else {
			if (val === 'Net 15')
				add = 15;
			else 
				add = 30;
			
			let ndate = this.addDays(this.salesInv.idate, add);
			this.salesInv.duedate = ndate.getMonth()+'/'+ndate.getDate()+'/'+ndate.getFullYear();
			console.log('due date ', this.salesInv.duedate);
		}
	}
	
	addDays(theDate, days) {
		return new Date(theDate.getTime() + (days * 24 * 60 * 60 *1000));
	}
	
	sumTotal() {
		let total = 0;
		let i = 0;
		for (i=0; i<this.itemsList.length; i++)
		{
			if (!isNaN(this.itemsList[i].extended))
				total = total + this.itemsList[i].extended;
		}
		this.salesInv.total = total;
	}
	
	closeItemView(newQuery) {
		this.popItems = false;
		console.log(newQuery);
		this.seq++;
		let line = {description: newQuery.DESCRIPTION, number:this.salesInv.number, itemno: newQuery.PRODUCT, status: 'O', quantity: 1,
		         discount: 0, price: newQuery.PRICE, taxcode: newQuery.TAXCODE, extended: newQuery.PRICE, 
				 partno: newQuery.PRODKEY, cogs: newQuery.COST, ordered: 0, invoice: "0", tax: 0};
	
		this.itemsList.push(line);
		this.sumTotal();
		this.canSave = true;
	}

	delItem(i) {
		this.itemsList.splice(i, 1);
	}
	
	printInvoice() {
	//	this.printSrv.print(this.printEl.nativeElement);
		window.print();
	}
	
	saveInvoice() {
		this.recvSrv.postData('/salesinvoice', this.salesInv)
		.subscribe(res => this.saveLine(),
		(err) => console.log(err)
		)
	}
	
	saveLine() {
		this.recvSrv.postData('sinvoicedet', this.itemsList)
		.subscribe(res => this.wrapUp(),
		(err) => console.log(err)
		)
	}
	
	wrapUp() {
		this.cancelInvoice();
	}
	
	cancelInvoice() {
		this.itemsList.length = 0;
		this.itemsList = [];
		this.salesInv.code = "";
		this.salesInv.customer = "";
		this.salesInv.address = "";
		this.salesInv.contact = "";
		this.custID = "";
		this.salesNo = 0;
		this.isNew = false;
	}
	
	closeInvoice() {
		this.router.navigate(['']);
	}
}
