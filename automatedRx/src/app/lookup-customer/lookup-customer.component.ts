import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { SearchService } from '../search.service';
import { Customer } from '../models/customer';

import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'lookup-customer',
  templateUrl: './lookup-customer.component.html',
  styleUrls: ['./lookup-customer.component.css']
})
export class LookupCustomerComponent implements OnInit {
    @Output() close = new EventEmitter<Customer>();
    newname = "";
	customers: Customer[];
    searchTerm$ = new Subject<string>();

  constructor(private searcher: SearchService) {
       this.searcher.searchC('/customer', this.searchTerm$)
        .subscribe( res => { 
            this.customers = res, 
            err => alert('err'),
            () => console.log(res)
        }); 
	  }

  ngOnInit() {
	  setTimeout(() => {document.getElementById('clookup').focus() }, 2000)
  }
     accept() {
    //    this.close.emit(this.newname);
    }

    cancel() {
        this.close.emit(null);
    }
	
	onSelect(customer) {
		this.close.emit(customer);
	}

}
