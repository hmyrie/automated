import { Component, OnInit } from '@angular/core';

import { PayableService } from '../payable.service';
import { LookupVendorComponent } from '../lookup-vendor/lookup-vendor.component';
import { StockItem } from '../models/stockitem';

@Component({
  selector: 'app-map-items',
  templateUrl: './map-items.component.html',
  styleUrls: ['./map-items.component.css']
})
export class MapItemsComponent implements OnInit {

  itemsList: Array<StockItem> = [];
  popVendor: boolean = true;
  popList: boolean = false;
  vendor: string;

  constructor(public paySrv: PayableService) { }

  ngOnInit() {
	  this.mapp();
  }

	closeModal(newVendor ) {
		this.popVendor = false;
		if (newVendor) {
			//this.btn_label = 'Supplier';
			this.vendor = newVendor.SUP_CODE;
			this.listItems(this.vendor);
		}
	}

	listItems(vend) {
		//  this.isAuto = true;
		this.paySrv.getStock('/items', vend)
		.subscribe((res) => {this.itemsList = res, console.log('res ', res)},
		(err) => console.log(err),
		()=> console.log("return good ")
		)	  
	}
  
	mapp() {
		this.paySrv.getItems('/jitems', 'vend')
	  
	}
  
	lookup(item) {
		this.popList = true;
		console.log(item.DESCRIPTION);
	}

	itemModal(newItem ) {
		this.popList = false;
		if (newItem) {
			//this.btn_label = 'Supplier';
		//	this.vendor = newVendor.SUP_CODE;
		//	this.listItems(this.vendor);
		console.log('Item ', newItem);
		}
	}
	
	setColor(xitm) {
		if (xitm)
			return "blue";
		else
			return "red";
	}
  
}
