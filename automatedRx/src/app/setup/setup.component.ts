import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.css']
})
export class SetupComponent implements OnInit {

    @Output() close = new EventEmitter<any>();
    cmpy: any = {name: "", phone: "", server: "", port: "", addr1: ""};

  constructor() { }

  ngOnInit() {
  }
  
  accept() {
	  this.close.emit(this.cmpy);
  }

}
