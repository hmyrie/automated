import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { AppConfig } from './models/app-config';
import { StockItem } from './models/stockitem';
import { StkValuation } from './models/stockvalue';
import { ListItem } from './models/listitem';
import { ControlItem } from './models/controlitems';
import { StockMovement } from './models/stockmovement';
import { VendorInvoice } from './models/vendorinvoice';
import { AppServService } from './app-serv.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class PayableService {
  baseUrl: string = 'http://'+this.appSrv.companyData.server+'/rxserver.php' //this.cnfg.apiUrl;
	info = this.appSrv.companyData;
	Listing: ListItem[] = [];
	Invoices: Array<VendorInvoice> = [];

  constructor(private httpClient: HttpClient, private cnfg: AppConfig, private appSrv: AppServService) { 

	}

	getLowStock(tbl, term) {
		const link = this.baseUrl+tbl+'?term='+term;
		return this.httpClient
		.get<StockItem[]>(link)
	}

	getStock(tbl, term) {
		const link = this.baseUrl+tbl+'?term='+term;
		return this.httpClient
		.get<StockItem[]>(link)
	}
	
	
	getItems(tbl,term) {
		let url = this.cnfg.apiUrl+tbl;
		let params = new HttpParams().set('term', term);
		return this.httpClient
					.get<any[]>(url, { params: params });
    }

	CtrlItems(tbl, term) {
		const link = this.baseUrl+tbl+'?term='+term;
		return this.httpClient
		.get<ControlItem[]>(link)
		
    }
		
	getValue(tbl) {
	const link = this.baseUrl+tbl;
	return this.httpClient
		.get<StkValuation>(link)
	}

	stockMovement(tbl, term) {
		const link = this.baseUrl+tbl+'?term='+term.itemno+'?term2='+term.date1+'?term3='+term.date2;
		return this.httpClient
		.get<StockMovement[]>(link)
	}
		
	getInvoices(tbl, terms) {
		console.log(this.info);
		let url = 'http://'+this.info.server+'/rxserver.php'; // 'http://localhost/rxserver.php';
		const link = url+tbl+'?term='+terms.sup1+'?term2='+terms.sup2+'?term3='+terms.date1+'?term4='+terms.date2;
		return this.httpClient
		.get<VendorInvoice[]>(link)
	//	.subscribe((res) => { this.Invoices = res; console.log('res ', res)},
	//	(err) => console.log(err),
	//		()=> console.log("return good ")
	//	)
    }

	stkList() {
		return this.Listing.slice();
	}
	
	transformArray(array: Array<any>, field) {
   var tot = 0;
   if (array) {
      const groupedObj = array.reduce((prev, cur) => {
        if (!prev[cur[field]]) {
          cur.NewField = "total";
          cur.total = cur.CAP_AMOUNT;
          prev[cur[field]] = [cur];
        } else {
          tot = tot + cur.CAP_AMOUNT;
          cur.NewField = "total";
          cur.total = tot;
          prev[cur[field]].push(cur);
        }
        return prev;
      }, {});
      return Object.keys(groupedObj).map(key => ({ key, total: groupedObj[key].total, value: groupedObj[key] }));
    }
    return [];
	}
}
