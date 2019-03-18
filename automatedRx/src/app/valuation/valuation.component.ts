import { Component, OnInit } from '@angular/core';

import { PayableService } from '../payable.service';
import { StkValuation } from '../models/stockvalue';

@Component({
  selector: 'app-valuation',
  templateUrl: './valuation.component.html',
  styleUrls: ['./valuation.component.css']
})
export class ValuationComponent implements OnInit {

	stkVal: StkValuation;
	markup = 0;
	margin = 0;
	printDate = new Date();
	canPrint = false;
	
  constructor(private paySrv: PayableService) { }

  ngOnInit() {
  }

  valuate() {
	  this.paySrv.getValue('/valuation')
			.subscribe((res) => {this.stkVal = res, this.compute(res)},
			(err) => console.log(err),
			()=> console.log("return good")
			)
  }
  
  compute(res) {
	  console.log(res);
	  this.markup = res[0].VCOST / res[0].VPRICE;
	  this.margin = (res[0].VPRICE - res[0].VCOST) / res[0].VPRICE;
	  this.canPrint = true;
  }
  
  printValue() {
	  window.print();
  }
}
