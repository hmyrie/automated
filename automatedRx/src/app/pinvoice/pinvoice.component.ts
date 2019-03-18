import { Component, OnInit } from '@angular/core';
import { PayableService } from '../payable.service';

import { LookupVendorComponent } from '../lookup-vendor/lookup-vendor.component';
import { ListItem } from '../models/listitem';
import { StockItem } from '../models/stockitem';

@Component({
  selector: 'app-pinvoice',
  templateUrl: './pinvoice.component.html',
  styleUrls: ['./pinvoice.component.css']
})
export class PinvoiceComponent implements OnInit {
 
  itemsList: Array<StockItem> = [];
  company = {name: "ABC Enterprise", address: "12 Walkers Way", phone: "(876) 542-4404", email: "comp@yahoo.com"};
  client = {name: "John Doe", address: "14 Willow Way", email: "johndoe@ymail.com"};
  invoice = {supcode: "123", supplier: "", number: "23123", date: "Nov. 11, 2018", due: "Dec. 1, 2018", address: "", phone: "", subtotal: 240, tax: 60, total: 300, taxpct: 0.25};
  lineitems =[{item: 1, description: "Web Development", remarks: "Developing a Content Management System-based Website", txcd: "N", taxamt: 0, uprice: 120, quantity: 2, total: 240}];
  popVendor: boolean = false;
  isActive: boolean = false;
  popItem: boolean = false;
  isAuto: boolean = false;
  supID: string = '';
  
  constructor(public paySrv: PayableService) { }

  ngOnInit() {
  }
  
  newInvoice() {
	  this.isActive = true;
	  this.popVendor = true;
  }

  closeModal(newVendor) {
	  this.popVendor = false;
	  if (newVendor) {
		//this.btn_label = 'Supplier';
		this.invoice.supcode = newVendor.SUP_CODE;
		this.invoice.supplier = newVendor.SUP_NAME;
		this.invoice.address = newVendor.SUP_ADR1;
		this.invoice.phone = newVendor.SUP_CONTACT;
		this.supID = newVendor.SUP_CODE;
	  }	  
  }
  
  closeStock(newItems : ListItem[]) {
	  this.popItem = false;
	  if (newItems) {
      for(let lineItem of newItems) {
        console.log(lineItem);
        this.lineitems.push(
          {
            item: parseInt(lineItem.ItemNo), 
            description: lineItem.Description, 
            remarks: "", 
            txcd: "N", 
            taxamt: 0, 
            uprice: lineItem.Price, 
            quantity: lineItem.Quantity, 
            total: lineItem.Price * lineItem.Quantity
          }
        );
      }
      this.calculateInvoiceSummary();
	  }
  }

  private calculateInvoiceSummary() {
    let subtotal = 0;
    let taxValue = 0;
    for(let lineItem of this.lineitems) {
      subtotal += lineItem.total;
    }
    this.invoice.subtotal = subtotal;
    taxValue = subtotal * (this.invoice.taxpct);
    console.log("taxvalue:"+taxValue);
    this.invoice.tax = taxValue;
    this.invoice.total = subtotal + taxValue;
  }
  
    lowStock() {
	  this.isAuto = true;
	  this.paySrv.getLowStock('/order', this.supID)
	  .subscribe((res) => this.itemsList = res,
	  (err) => console.log(err),
	  ()=> console.log("return good")
	  )
	}
  
  
  getVendor() {
	  
  }
  
  addItem() {
	  this.popItem = true;
  }
  
  printInv() {
	  window.print();
  }
  
 }
