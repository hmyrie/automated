import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { AppConfig } from './models/app-config';
import { AppServService } from './app-serv.service';
import { ListItem } from './models/listitem';
import { PosLine } from './models/posline';
import { Doctor } from './models/doctor';

@Injectable()
export class ReceivableService {
  baseUrl: string = 'http://'+this.appSrv.companyData.server+'/rxserver.php' //this.cnfg.apiUrl;
	info = this.appSrv.companyData;
	Listing: ListItem[] = [];

  constructor(private httpClient: HttpClient, private cnfg: AppConfig, private appSrv: AppServService) { }

  	getCompany() {
		return this.appSrv.companyData;
	}
	
	getItems(tbl,term) {
		let url = this.baseUrl+tbl+'?term='+term;
		let params = new HttpParams().set('term', term);
		return this.httpClient
					.get<any[]>(url, { params: params });
    }

  	getItem(tbl,term, trm2) {
		let url = this.baseUrl+tbl;
		let params = new HttpParams().set('term', term);
		return this.httpClient
					.get<any[]>(url, { params: params });
    }

  	getDoctor(tbl,term) {
		let url = this.baseUrl+tbl;
		let params = new HttpParams().set('term', term);
		return this.httpClient
					.get<Doctor[]>(url, { params: params });
    }
	
	getReceipt() {
		let url = this.baseUrl+'/newsales';
		return this.httpClient
		   .get<any[]>(url);
	}

	fetchData(tbl) {
		let url = this.baseUrl+tbl;
		return this.httpClient
		   .get<any[]>(url);
	}

	fetchGraph(tbl, parm) {
		let params = new HttpParams().set('term', parm);
		let url = this.baseUrl+tbl;
		return this.httpClient
		   .get<any[]>(url, { params: params });
	}
	
	fetchSales(tbl, parm1, parm2) {
		let url = this.baseUrl+tbl;
		 // Initialize Params Object
		let params = new HttpParams();

    // Begin assigning parameters
		params = params.append('term', parm1);
		params = params.append('term2', parm2);

		return this.httpClient
					.get<any>(url, { params: params });
	}
	
	saveSales(tbl, data) {
		let pdata = JSON.stringify(data);
		let url = this.baseUrl+tbl;
		return this.httpClient
			.post(url, pdata);
	}
	
	postCustomer(tbl, data) {
		let url = this.baseUrl+tbl;
		let pdata = JSON.stringify(data);
		return this.httpClient
			.post(url, pdata);
	}

	postData(tbl, data) {
		let url = this.baseUrl+tbl;
		let pdata = JSON.stringify(data);
		return this.httpClient
			.post(url, pdata);
	}
}
