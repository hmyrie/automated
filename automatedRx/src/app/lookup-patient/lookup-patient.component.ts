import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { SearchService } from '../search.service';
import { Patient } from '../models/patient';

import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'lookup-patient',
  templateUrl: './lookup-patient.component.html',
  styleUrls: ['./lookup-patient.component.css']
})
export class LookupPatientComponent implements OnInit {

    @Output() close = new EventEmitter<Patient>();
    newname = "";
	patients: Patient[];
    searchTerm$ = new Subject<string>();

  constructor(private searcher: SearchService) { 
         this.searcher.searchP('/patient', this.searchTerm$)
        .subscribe( res => { 
            this.patients = res, 
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
	
	onSelect(pat) {
		console.log(pat);
		this.close.emit(pat);
	}

}
