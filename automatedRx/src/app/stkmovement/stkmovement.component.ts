import { Component, OnInit } from '@angular/core';

import { PayableService } from '../payable.service';
import { ListItem } from '../models/listitem';
import { StockMovement } from '../models/stockmovement';
import { SearchService } from '../search.service';

import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-stkmovement',
  templateUrl: './stkmovement.component.html',
  styleUrls: ['./stkmovement.component.css']
})
export class StkmovementComponent implements OnInit {

	stkListing: ListItem[];
  //  searchTerm$ = new Subject<string>();
    searchText = "";
	showDate = false;
	reportDate = {itemno: 0, date1: '', date2: ''};
    searchTerm$ = new Subject<string>();
	canPrint: boolean = false;
	public filteredList: ListItem[];
	detailList: StockMovement[];

  constructor(public paySrv: PayableService, private searcher: SearchService) {
       this.searcher.searchS('/itemlist', this.searchTerm$)
        .subscribe( res => { 
	//		console.log(res),
            this.filteredList = res, 
            err => alert('err'),
            () => console.log(res)
        }); 
  }

  ngOnInit() {
  }

	onSelect(item) {
		console.log(item.PRODUCT);
		this.reportDate.itemno = item.PRODUCT;
		this.searchText = item.DESCRIPTION;
		this.filteredList = [];
		this.showDate = true;
	//	this.canPrint = true;
	}
  
	accept() {
		this.paySrv.stockMovement('/stkmovement', this.reportDate)
		.subscribe( res => {
			this.process(res),
			err => console.log(err),
			console.log(res)
		});
	}
	
	process(res) {
		this.detailList = res;
		this.canPrint = true;
	}
	
	printIt() {
		window.print();
	}
}
