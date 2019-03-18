import { Injectable, Inject } from '@angular/core';

import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';

interface Icompany {
  name: string,
  addr1: string,
  phone: string,
  server: string,
  port: number
}  
@Injectable()
export class AppServService {

	key_name: string = 'cmpy';
	public companyData: any;

  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService) { }

  	saveInLocal(val): void {
		this.storage.set(this.key_name, JSON.stringify(val));
	//	this.compData[key]= this.storage.get(key);
	}  
	
	
	getFromLocal() {
		console.log('received= key:' + this.key_name);
		let valu = this.storage.get(this.key_name);
		this.companyData = JSON.parse(valu);
		console.log(this.companyData);
		return this.companyData;
	}
	

}
