import { Component, OnInit } from '@angular/core';

import { Patient } from '../models/patient';
import { Doctor } from '../models/doctor';
import { Dscript } from '../models/dscript';
import { ReceivableService } from '../receivable.service';

@Component({
  selector: 'app-script',
  templateUrl: './script.component.html',
  styleUrls: ['./script.component.css']
})
export class ScriptComponent implements OnInit {

	rxType = ["Private", "Clinic", "Hospital"];
	script = {rxno: 1234, name: "Angella Doe", doctor: "Kevin Rowe", status: "new", type: "Private", date: new Date(),
	           insplan1: "", insplan2: "", insplan3: "", insplan4: "", subtotal: 150.00, discount: 0.0, tax: 0.00, total: 150.00};
	popPatient: boolean = false;
	popItems: boolean = false;
	docList: Array<Doctor> = [];
	docInfo: any;
	detailLines: Array<Dscript> = [];
	labelList: any;
	insuranceList: any;
	rxLabel: string = "";
  constructor(private recvSrv: ReceivableService) { }

  ngOnInit() {
	  this.getLabelCodes() ;
	  this.getInsurances();
	  this.detailLines = [];
  }

	getKeyPress(event) {
		var x = event.key;

		// If the pressed keyboard button is "a" or "A" (using caps lock or shift), alert some text.

		if (x == "a" || x == "A") { 
			alert ("You pressed the 'A' key!");
		}
		if (x == "F12" || x == "F12") { 
			this.openDialog('swipId');
		}
	}
	
	doPatient() {
		this.popPatient = true;
	}
	
	lookupDoctor(doc) {
		this.recvSrv.getDoctor('/doctor', doc)
		.subscribe(res => this.docList = res)
	}
	
	getDoctor() {
		this.openDialog('docId');
	}
	
	onDocSelect(doctor) {
		this.script.doctor = doctor.FULLNAME;
		this.docInfo = doctor;
		this.docList = [];
	}
	
	addDoctor(doc) {
		this.script.doctor = this.docInfo.FULLNAME;
		this.closeDialog('docId');
	}
	
	selType(opt) {
		this.script.type = opt;
	}
	
	doItems() {
		this.popItems = true;
	}

	applyDiscount(pct) {
		if (pct > 0) {
			let disc = this.script.subtotal * pct / 100;
			this.script.discount = disc;
			this.script.total = this.script.subtotal - disc;
		}
		this.closeDialog('discountId');
	}
	
	openDialog(which) {
		var modal = document.getElementById(which);
		modal.style.display = "block";
	}
		
	closeDialog(which) { 
		var modal = document.getElementById(which);
		modal.style.display = "none";
	}

	    closeModal(newQuery) {
		this.popPatient = false;
		console.log(newQuery);
		this.script.name = newQuery.name;
	}
	
	labeling(code) {
		if (code) {
			var array = code.split(',');
			this.rxLabel = "";
			console.log(array);
			if (this.labelList[0].hasOwnProperty("CODE"))
				this.doLabel(array);
			else
				console.log('not finding property');
			this.closeDialog('labelId');
		}
	}
	
	doLabel(ary) {
		let i = 0;
		for (i=0; i<ary.length;i++) {
			this.getLabelDesc(ary[i]);
		}
		console.log(this.rxLabel);
	}
	
	getLabelDesc(code) {
		let i = this.labelList.length;
		let found = false;

		while(i--) {
			if(code == this.labelList[i].CODE) {
				this.rxLabel = this.rxLabel + this.labelList[i].DESCRIPTION + ' ';
				found = true;
				break;
			}
		}
		if (!found)
			this.rxLabel = this.rxLabel + ' ' + code;
		console.log(this.rxLabel);
	}
	
	getLabelCodes() {
		this.recvSrv.fetchData('/label')
		.subscribe((res) => this.labelList = res);
	}
	
	getInsurances() {
		this.recvSrv.fetchData('/insurance')
		.subscribe((res) => this.insuranceList = res);
	}
	
	insPlan(cardno) {
				console.log(this.insuranceList);
		let bin = cardno.substr(1,3);
		let card = cardno.substr(4, 33);
		let name = cardno.substr(34, 40);
		let idx = cardno.indexOf('?;', cardno);
		let track2 = cardno.substr(idx, 37);
		console.log(card);
		console.log(idx);
		console.log(track2);
		this.getPlan(bin);
		this.script.name = name;
		this.closeDialog('swipeId');
	}
	
	getPlan(pln) {
		let i = this.insuranceList.length;
		let found = false;
		let plan = "";

		while(i--) {
			if(pln == this.insuranceList[i].CKEY.trim()) {
				plan = this.insuranceList[i].NAME;
				console.log(plan);
				found = true;
				break;
			}
		}
		if (pln === 'NHF')
			this.script.insplan4 = plan;
		else {
			if (this.script.insplan1.length === 0)
				this.script.insplan1 = plan;
		}
	}
		
	closeItemView(newQuery) {
		this.popItems = false;
		if (newQuery) {
			let item = {
				prescription: 0,
				controlno: 0,
				product: newQuery.PRODUCT,
				description: newQuery.DESCRIPTION,
				cost: newQuery.PRICE,
				extended: newQuery.PRICE,
				fees: 0,
				tax: 0,
				txcd: newQuery.TAXCODE,
				discount: 0,
				cogs: newQuery.COST,
				refills: 0,
				label: '',
				percent: 0,
				days: 14,
				rfcode: 0,
				authorize: '',
				daw: 'Y',
				response: '',
				reject: '',
				modified: 'N',
				insurance: 'N',
				reference: '',
				mesg: '',
				diagc: '',
				void: 'N',
				labelx: '',
				pdcode: 0,
				charges: 0,
				xmitted: 'N',
				printed: 'N',
				comcode: '',
				nhf: 0,
				nhf_cost: 0,
				charges2: 0,
				ndiscount: 0,
				instruct: '',
				compound: '',
				authz: '',
				authz2: '',
				authz3: '',
				authz4: '',
				resp1: '',
				resp2: '',
				resp3: '',
				resp4: '',
				ins1: '',
				ins2: '',
				ins3: '',
				ins4: '',
				qty2: 0,
				qty: 0 }
		    this.detailLines.push(item);
			console.log(this.detailLines);
		}
	}
	
	calcLine(i) {
		this.detailLines[i].extended = this.detailLines[i].cost * this.detailLines[i].qty + this.detailLines[i].fees;
		console.log('index ', i);
	}
	
}


