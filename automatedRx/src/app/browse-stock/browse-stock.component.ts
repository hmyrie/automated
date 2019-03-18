import { Component, OnInit, EventEmitter, Input, Output, ElementRef } from '@angular/core';
import { ListItem } from '../models/listitem';

import { LookupVendorComponent } from '../lookup-vendor/lookup-vendor.component';
import { PayableService } from '../payable.service';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { SearchService } from '../search.service';
import { FormGroup, FormBuilder, FormArray, ValidatorFn, FormControl } from '@angular/forms';
//import { Subject } from 'rxjs/Subject';

@Component({
	selector: 'browse-stock',	
	templateUrl: './browse-stock.component.html',
	styleUrls: ['./browse-stock.component.css']
})
export class BrowseStockComponent implements OnInit {
    @Output() close = new EventEmitter<ListItem[]>();
    newname = "";
	//xitem: any;
	stkListing: ListItem[] = [];
  //  searchTerm$ = new Subject<string>();
    searchText = "";
	private filteredList: ListItem[];  

	private elementRef : ElementRef

	private lineItemsForm : FormGroup;

	constructor(private paySrv: PayableService, private formBuilder: FormBuilder, private rxEle:ElementRef) {
		this.lineItemsForm = formBuilder.group({
			lineItemChkBox : new FormArray([],minSelectedCheckboxes(1))
			}
		);
		this.elementRef = rxEle;
	}

	private addLineItemCheckboxes() {
		this.filteredList.map((lineItem, index) => {
		  const control = new FormControl();
		  (this.lineItemsForm.controls.lineItemChkBox as FormArray).push(control);
		});
	  }

	ngOnInit() {
		
	}
  
	accept() {
		const selectedOrderIds = this.lineItemsForm.value.lineItemChkBox
		.map((v, i) => v ? this.filteredList[i] : null)
		.filter(v => v !== null);
	  console.log(selectedOrderIds);
		this.close.emit(selectedOrderIds);
    }

    cancel() {
        this.close.emit(null);
    }
	
	
	filters() {
		if (this.searchText.length > 2){
			this.filteredList = this.paySrv.stkList().filter(function(el){
				return el.Description.toLowerCase().indexOf(this.searchText.toLowerCase()) > -1;
			}.bind(this));
		} else {
			this.filteredList = [];
		}
		
	}
	
	lookup() {
		this.paySrv.getItems('/lineitems',this.searchText)
		.map(
			(response : any[]) => {
				for(let item of response) {
					this.stkListing.push({
						"ItemNo": item.PRODUCT,
						"Description": item.DESCRIPTION,
						"Package": "",
						"Packsize": item.PACKSIZE,
						"Quantity": 1,
						"Price": item.PRICE,
						"Taxed": "",
						"Prodkey": item.PRODKEY,
						"Cogs": item.COST,
						"Warehouse": ""}
					);
				}
				console.log(this.stkListing);
				return this.stkListing;
			}

		)
		.subscribe (
			(listitems : ListItem[]) => {
				this.filteredList = listitems;
				this.addLineItemCheckboxes();
		});
	}

	handleClick(event){
		var clickedComponent = event.target;
		var inside = false;
		do {
			if (clickedComponent === this.elementRef.nativeElement) {
				inside = true;
			}
			clickedComponent = clickedComponent.parentNode;
		} while (clickedComponent);
		if(!inside){
			this.filteredList = [];
		}
	}
}

function minSelectedCheckboxes(min = 1) {
	const validator: ValidatorFn = (formArray: FormArray) => {
	  const totalSelected = formArray.controls
		.map(control => control.value)
		.reduce((prev, next) => next ? prev + next : prev, 0);
  
	  return totalSelected >= min ? null : { required: true };
	};
  
	return validator;
  }