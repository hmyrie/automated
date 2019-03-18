import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { SearchService } from '../search.service';
import { Supplier } from '../models/vendor';

import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'vendor-query',
  templateUrl: './vendor-query.component.html',
  styleUrls: ['./vendor-query.component.css']
})
export class VendorQueryComponent implements OnInit {

    @Output() close = new EventEmitter<any>();
    newname = "";
	today = Date;
	vendors: Supplier[];
	param = {sname1: "", sname2: "", sup1: "", sup2: "", date1: "", date2: ""};
    searchTerm$ = new Subject<string>();
	isList1 = false;

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

	onSelect(vend) {
		console.log(vend);
		this.param.sup1 = vend.SUP_CODE;
		this.param.sname1 = vend.SUP_NAME;
		this.vendors = [];
	}
  
	onSelect2(vend) {
		this.param.sup2 = vend.SUP_CODE;
		this.param.sname2 = vend.SUP_NAME;
		this.vendors = [];
	}
	
	accept() {
		let fdate = this.ChangeFormateDate(this.param.date1);
		let ldate = this.ChangeFormateDate(this.param.date2);
		this.param.date1 = fdate;
		this.param.date2 = ldate;
		console.log(this.param);
		this.close.emit(this.param);
	}
	
	ChangeFormateDate(oldDate){
		var p = oldDate.split(/\D/g)
		return [p[1],p[2],p[0] ].join("/")
	}
}
