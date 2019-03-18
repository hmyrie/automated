import { Component, OnInit } from '@angular/core';

import { ControlItem } from '../models/controlitems';
import { PayableService } from '../payable.service';

@Component({
  selector: 'app-stkcontrol',
  templateUrl: './stkcontrol.component.html',
  styleUrls: ['./stkcontrol.component.css']
})
export class StkcontrolComponent implements OnInit {
	
	terms = ["Expired Items", "Low Stock"];
	
	itemList: ControlItem[]
	canPrint: boolean = false;
	printDate = new Date();
	
  constructor(public paySrv: PayableService) { }

  ngOnInit() {
  }

  getStock() {
	  this.paySrv.CtrlItems('/productcontrol', '')
	  .subscribe( res => {
		   this.processList(res),
		  err => console.log(err),
		  console.log(res)
	  });	  
  }
  
	processList(res) {
		this.itemList = res;
		this.canPrint = true;
	}
	
	printStock() {
		window.print();
	}
}
