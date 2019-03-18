import { Component, OnInit, ViewChild } from '@angular/core';

import { SearchService } from '../search.service';
import { PayableService } from '../payable.service';
import { ListItem } from '../models/listitem';
import {PageSettingsModel } from '@syncfusion/ej2-angular-grids';
import { GroupService, SortService, GridComponent } from '@syncfusion/ej2-angular-grids';

import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})

export class ItemComponent implements OnInit {
    public filter: Object;
    public filterSettings: Object;
	public groupOptions: Object;
	stkListing: ListItem[];
	searchText: string = "";
	filteredList: ListItem[];
	 public refresh: Boolean;
    searchTerm$ = new Subject<string>();
	 public pageSettings: PageSettingsModel;
	 @ViewChild('grid')
    public grid: GridComponent;

  constructor(public paySrv: PayableService, private searcher: SearchService) {
       this.searcher.searchS('/itemlist', this.searchTerm$)
        .subscribe( res => { 
            this.filteredList = res, 
            err => alert('err'),
            () => console.log(res)
        }); 
	  }

	ngOnInit() {
		this.stkListing = this.paySrv.stkList();
		this.pageSettings = { pageSize: 25 };
        this.filterSettings = { type: "Menu" };      
        this.filter = { type: "CheckBox" };
		this.groupOptions = { showGroupedColumn: false, columns: ['CATEGORY1'] };
		this.getAllItems();
	}
  
	onDataBound() {
        if(this.refresh){
            this.grid.groupColumn('Country');
            this.refresh =false;
        }
	}
	
	selectItem() {
	}
	
	filters() {
		if (this.searchText.length > 2){
			this.filteredList = this.paySrv.stkList().filter(function(el){
				return el.Description.toLowerCase().indexOf(this.searchText.toLowerCase()) > -1;
			}.bind(this));
		} else {
			this.filteredList = [];
		}
		
	}
	
	getAllItems() {
		this.paySrv.getItems('/itemlist','')
		.subscribe(res => this.filteredList = res);
	}
}
