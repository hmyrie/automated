import { Component, OnInit } from '@angular/core';

import { AppServService } from './app-serv.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'app';
  compData: any = {name: "", phone: "", server: "", port: "", addr1: ""};
  
  constructor(private store: AppServService) {}

	showMenu: boolean = false;
	popCompany: boolean = false;

	ngOnInit() {
		this.startUp();
	}
  
	toggle() {
		this.showMenu = !this.showMenu;
		let menu = document.getElementById('menu-v');
		if (menu.style.display === 'none') {
			menu.style.width = '110px';
			menu.style.display = 'block';
		}
		else {
			menu.style.display = 'none';
			menu.style.width = '0';
		}
	}

	startUp() {
		let valu = this.store.getFromLocal();
		if (valu === null)
	    	this.popCompany = true;
	}
	
	closeModal(newCompany) {
		console.log(newCompany);
		this.popCompany = false;
		if (newCompany) {
			this.store.saveInLocal(newCompany);
		}
	}
	
	hideMenu() {
		this.showMenu = false;
		let menu = document.getElementById('menu-v');
		menu.style.display = 'none';
		menu.style.width = '0';
	}
	
	/* Set the width of the side navigation to 250px */
	openNav() {
		document.getElementById("menu-v").style.width = "110px";
		document.getElementById("menu-v").style.display = "block";
	}

	/* Set the width of the side navigation to 0 */
	closeNav() {
		document.getElementById("menu-v").style.width = "0";
		document.getElementById("menu-v").style.display = "none";
	}
}
