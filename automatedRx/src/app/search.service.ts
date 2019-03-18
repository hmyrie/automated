import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import { AppConfig } from './models/app-config';
import { Supplier } from './models/vendor';
import { Customer } from './models/customer';
import { ListItem } from './models/listitem';
import { Patient } from './models/patient';
import { AppServService } from './app-serv.service';

@Injectable()
export class SearchService {
    baseUrl: string = 'http://'+this.appSrv.companyData.server+'/rxserver.php'  //this.cnfg.apiUrl;

  constructor(private http: HttpClient, private cnfg: AppConfig, private appSrv: AppServService) { }
    search(tabl: string, terms: Observable<string>) {
        return terms.debounceTime(600)
              .distinctUntilChanged()
              .switchMap(term => this.searchEntries(tabl, term))
    }

	    searchEntries(tbl, term) {
        console.log(term);
		let url = this.baseUrl+tbl;
		//const trm = '%'+term+'%';
		let params = new HttpParams().set('term', term);
		const link = this.baseUrl+tbl+'?term='+term;
        return this.http
              .get<Supplier[]>(url, { params: params })
    }
	
	searchS(tabl: string, terms: Observable<string>) {
        return terms.debounceTime(600)
              .distinctUntilChanged()
              .switchMap(term => this.searchSrv(tabl, term))
    }
	
    searchSrv(tbl, term) {
		const link = this.baseUrl+tbl+'/term='+term;
		let url = this.baseUrl+tbl;
		//const trm = '%'+term+'%';
		let params = new HttpParams().set('term', term);
		console.log('term ', link);
        return this.http
              .get<ListItem[]>(url, { params: params })
    }
	searchP(tabl: string, terms: Observable<string>) {
        return terms.debounceTime(600)
              .distinctUntilChanged()
              .switchMap(term => this.searchPat(tabl, term))
    }
	
    searchPat(tbl, term) {
		const link = this.baseUrl+tbl+'/term='+term;
		let url = this.baseUrl+tbl;
		let params = new HttpParams().set('term', term);
		console.log('term ', link);
        return this.http
              .get<Patient[]>(url, { params: params })
    }

		searchC(tabl: string, terms: Observable<string>) {
        return terms.debounceTime(600)
              .distinctUntilChanged()
              .switchMap(term => this.searchCust(tabl, term))
    }
	
    searchCust(tbl, term) {
		const link = this.baseUrl+tbl+'/term='+term;
		let url = this.baseUrl+tbl;
		let params = new HttpParams().set('term', term);
		console.log('term ', link);
        return this.http
              .get<Customer[]>(url, { params: params })
    }

}
