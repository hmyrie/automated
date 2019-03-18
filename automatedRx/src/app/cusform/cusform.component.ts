import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Customer } from '../models/customer';
import { ReceivableService } from '../receivable.service';

@Component({
  selector: 'app-cusform',
  templateUrl: './cusform.component.html',
  styleUrls: ['./cusform.component.css']
})
export class CusformComponent implements OnInit {

	customerForm: FormGroup;
	submitted = false;
	loading = false;
	cusRecord: Customer;
	
  constructor(private formbuilder: FormBuilder, private recvSrv: ReceivableService, private router: Router) { }

  ngOnInit() {
	  this.customerForm = this.formbuilder.group({
			code: ['', Validators.required],
			name: ['', Validators.required],
			contact: [],
			adr1: ['', Validators.required],
			adr2: [],
			phone: [],
			city: []
/*			cusRecord.adr2: string;
			cusRecord.city: string;
			cusRecord.prov: string;
			cusRecord.country: string;
			cusRecord.tel: string;
			cusRecord.contact: string; */
	  });
	}
	
	// convenience getter for easy access to form fields
    get f() { return this.customerForm.controls; }

	onSubmit() {
		this.submitted = true;
		if (this.customerForm.invalid) {
			alert('form invalid');
			return;
		}
		//process
		console.log(this.customerForm.value);
		if (this.customerForm.value.city === null)
			this.customerForm.value.city = ' ';
		this.recvSrv.postCustomer('/customer', this.customerForm.value)
		.subscribe(res => this.formPosted());
	}
	
	formPosted() {
		this.customerForm.reset;
		alert('Posted Successfully');
		this.submitted = false;
	}
	
	close() {
		this.router.navigate(['']);
	}
}
