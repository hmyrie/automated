import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-tendered',
  templateUrl: './tendered.component.html',
  styleUrls: ['./tendered.component.css']
})
export class TenderedComponent implements OnInit {

    @Output() close = new EventEmitter<any>();
	@Input() total;
	tender = {paymode: 'Cash', amount: 0, currency: 'JAD' };
	paymodes = ["Cash", "Debit Card", "Credit Card", "Voucher", "Charge"];
	currencies = ["JAD"];
	popTender = false;
	errmsg = '';
  constructor() { }

  ngOnInit() {
  }

	selectPMode(val) {
		this.tender.paymode = val;
	}
	
	selectCurrency(val) {
		this.tender.currency = val;
	}
	
	accept(val) {
		this.tender.amount = val;
		if (val >= this.total)
			this.close.emit(this.tender);
	    else
			this.errmsg = "Please check amount tendered";
	}
}
