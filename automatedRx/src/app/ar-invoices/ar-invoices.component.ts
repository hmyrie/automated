import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { PayableService } from '../payable.service';

import { VendorInvoice } from '../models/vendorinvoice';

@Component({
  selector: 'app-ar-invoices',
  templateUrl: './ar-invoices.component.html',
  styleUrls: ['./ar-invoices.component.css']
})
export class ArInvoicesComponent implements OnInit, AfterContentChecked {

	popVendor: boolean;
	range: string;
	invoiceList: Array<VendorInvoice> = [];
	sortedList: Array<any> = [];
	subTotal = 0.0;
	runningTot = 0.0;
	supId ="";
	summ = false;
	counter = 0;
	prv_counter = 0;
	
  constructor(public paySrv: PayableService) { }

  ngOnInit() {
	  this.popVendor = true;
  }

  ngAfterContentChecked() {
	//  this.subTotal = this.sortedList.reduce(function(runningTot: number, listing) => {
	//	  runningTot = runningTot + listing.total;
	//  }, 0);
	this.subTotal = this.runningTot;
	console.log('after content check trigger', this.subTotal);
  }
  
    closeModal(newQuery) {
		this.popVendor = false;
		if (newQuery) {
			this.range = 'Suppliers - ' + newQuery.sname1 + ' to ' + newQuery.sname2;
			this.paySrv.getInvoices('/invoice', newQuery)
			.subscribe((res) => {this.invoiceList = res, this.newList(res)},
			(err) => console.log(err),
			()=> console.log("return good")
			)
		}
	}
	
	newList(list) {
		this.sortedList = this.paySrv.transformArray(list, 'SUP_NAME');
		console.log(this.sortedList);
	}
	
	sumAmounts(index, rec) {
		if (rec.SUP_CODE != this.supId) {
			this.runningTot = rec.CAP_AMOUNT;
			this.supId = rec.SUP_CODE;
		//	console.log('initialize ', this.runningTot);
			this.summ = true;
			this.counter++;
	//		document.getElementById('xdiv').innerHTML = this.runningTot;
		}
		else {
			this.runningTot = this.runningTot + rec.CAP_AMOUNT;
			console.log('Addition ', rec.CAP_AMOUNT);
		}
	}
}
