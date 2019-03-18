import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { SearchService } from '../search.service';
import { Supplier } from '../models/vendor';

import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'lookup-vendor',
  templateUrl: './lookup-vendor.component.html',
  styleUrls: ['./lookup-vendor.component.css']
})
export class LookupVendorComponent implements OnInit {
    @Output() close = new EventEmitter<Supplier>();
    newname = "";
	vendors: Supplier[];
    searchTerm$ = new Subject<string>();

  constructor(private searcher: SearchService) {
       this.searcher.search('/vendor', this.searchTerm$)
        .subscribe( res => { 
            this.vendors = res, 
            err => alert('err'),
            () => console.log(res)
        }); 
	}

  ngOnInit() {
  }
  
     accept() {
    //    this.close.emit(this.newname);
    }

    cancel() {
        this.close.emit(null);
    }
	
	onSelect(vendor) {
		this.close.emit(vendor);
	}
}
