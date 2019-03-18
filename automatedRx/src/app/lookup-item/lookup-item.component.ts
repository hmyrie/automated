import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { SearchService } from '../search.service';
import { ListItem } from '../models/listitem';

import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'lookup-item',
  templateUrl: './lookup-item.component.html',
  styleUrls: ['./lookup-item.component.css']
})
export class LookupItemComponent implements OnInit {

    @Output() close = new EventEmitter<ListItem>();
	itemList: Array<ListItem> = [];
    searchTerm$ = new Subject<string>();

	constructor(private searcher: SearchService) { 
	     this.searcher.searchS('/lineitems', this.searchTerm$)
        .subscribe( res => { 
            this.itemList = res, 
            err => alert('err'),
            () => console.log(res)
        }); 
	}

  ngOnInit() {
  }
  
	itemSearch() {
 
	}

    accept() {
    //    this.close.emit(this.newname);
    }

    cancel() {
        this.close.emit(null);
    }
	
	onSelect(item) {
		this.close.emit(item);
	}

}
