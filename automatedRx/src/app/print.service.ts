import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';

import * as qz from 'qz-tray';
import { sha256 } from 'sha.js';

//declare var qz: any;
declare var sha1: any;

@Injectable()
export class PrintService {
	 
	qzVersion = 0;
    cfg = null;
	
  constructor() { }

	public print(printEl: HTMLElement) {
		//let printContainer: HTMLElement = document.querySelector('#print-container');
		let printContainer: HTMLElement = document.getElementById('#print-container');

		if (!printContainer) {
			printContainer = document.createElement('div');
			printContainer.id = 'print-container';
		} 

		printContainer.innerHTML = '';

		let elementCopy = printEl.cloneNode(true);
		printContainer.appendChild(elementCopy);
		document.body.appendChild(printContainer);

		window.print();
	}
	/*
	printRaw() {
		qz.websocket.connect().then(() => 
			qz.printers.find(PRINTER_NAME)
			)
	}
	*/
	
	override() {
		qz.api.setSha256Type(data => sha256(data));
		qz.api.setPromiseType(resolver => new Promise(resolver));
		
/*		z.api.setSha256Type(function (data) {
			return shajs('sha256').update(data).digest('hex')
		});
		
		qz.api.setPromiseType(function (resolver) {
			return new Promise(resolver);
		}); */
	}
	// Get the list of printers connected
	getPrinters(): Observable<string[]> {
		return Observable
			.fromPromise(qz.websocket.connect().then(() => qz.printers.find()))
			.map((printers: string[]) => printers)
		//	.catch(this.errorHandler);
	}
	
	launchQZ() {
        if (!qz.websocket.isActive()) {
            window.location.assign("qz:launch");
            //Retry 5 times, pausing 1 second between each attempt
            this.startConnection({ retries: 5, delay: 1 });
        }
    }
	
    startConnection(config) {
        if (!qz.websocket.isActive()) {
            this.updateState('Waiting', 'default');

            qz.websocket.connect(config).then(() => {
                this.updateState('Active', 'success');
                this.findVersion();
            }).catch(this.handleConnectionError);
        } else {
            this.displayMessage('An active connection with QZ already exists.', 'alert-warning');
        }
    }	
	
	endConnection() {
        if (qz.websocket.isActive()) {
            qz.websocket.disconnect().then(() => {
                this.updateState('Inactive', 'default');
            }).catch(this.handleConnectionError);
        } else {
            this.displayMessage('No active connection with QZ exists.', 'alert-warning');
        }
    }

	launchOff() {
		//qz.websocket.connect().then(() => qz.printers.find(PRINTER_NAME));
	}
	
	// Get the SPECIFIC connected printer
	getPrinter(printerName: string): Observable<string> {
		return Observable
			.fromPromise(qz.websocket.connect()
			.then(() => qz.printers.find(printerName))
		)
		.map((printer: string) => printer)
	//	.catch(this.errorHandler);
	}

	updateState(text, css) {
     /*   $("#qz-status").html(text);
        $("#qz-connection").removeClass().addClass('panel panel-' + css);
		*/
        if (text === "Inactive" || text === "Error") {
          console.log(text); //  $("#launch").show();
        } else {
            console.log(text); //$("#launch").hide();
        }
    }
	
	// Print data to chosen printer
	printData(printer: string, data: any): Observable<any> {
		const config = qz.configs.create(printer);
		return Observable.fromPromise(qz.print(config, data))
		.map((anything: any) => anything)
	//	.catch(this.errorHandler);
	}
	
	// Disconnect QZ Tray websocket
	removePrinter(): void {
		qz.websocket.disconnect();
	}
	
	errorHandler(error: any): Observable<any> {
		return Observable.throw(error);
	}
	
	initialize() {
		qz.api.setSha256Type(function(data) { 
		var hashed = sha1(data); 
		return hashed; 
	});

	}
	
	showDefault() {
	//	this.override();
		qz.websocket.connect()
		.then(qz.printers.getDefault)
		.then(printer => console.log("The default printer is: " + printer))
		.then(qz.websocket.disconnect)
		.catch(err => console.error(err));
	}
	
	findDefaultPrinter(set) {
        qz.printers.getDefault().then((data) => {
            this.displayMessage("<strong>Found:</strong> " + data, '');
            if (set) { this.setPrinter(data); }
        }).catch(this.displayError);
    }
	
	displayError(err) {
        console.error(err);
        this.displayMessage(err, 'alert-danger');
    }

    displayMessage(msg, css) {
        if (css == undefined) { css = 'alert-info'; }

        //var timeout = setTimeout(function() { $('#' + timeout).alert('close'); }, 5000);
		alert(msg);
    }
	
	setPrinter(printer) {
        var cf = this.getUpdatedConfig();
        cf.setPrinter(printer);

        if (printer && typeof printer === 'object' && printer.name == undefined) {
            var shown;
            if (printer.file != undefined) {
                shown = "<em>FILE:</em> " + printer.file;
            }
            if (printer.host != undefined) {
                shown = "<em>HOST:</em> " + printer.host + ":" + printer.port;
            }

            console.log(shown); //$("#configPrinter").html(shown);
        } else {
            if (printer && printer.name != undefined) {
                printer = printer.name;
            }

            if (printer == undefined) {
                printer = 'NONE';
            }
          //  $("#configPrinter").html(printer);
        }
    }
	
    getUpdatedConfig() {
        if (this.cfg == null) {
            this.cfg = qz.configs.create(null);
        }

        this.updateConfig();
        return this.cfg
    }

	updateConfig() {
        var pxlSize = null; /*
        if ($("#pxlSizeActive").prop('checked')) {
            pxlSize = {
                width: $("#pxlSizeWidth").val(),
                height: $("#pxlSizeHeight").val()
            }; */
        }
	
    findVersion() {
        qz.api.getVersion().then(function(data) {
         //   $("#qz-version").html(data);
            this.qzVersion = data;
        }).catch(this.displayError);
    }
	
	handleConnectionError(err) {
        this.updateState('Error', 'danger');

        if (err.target != undefined) {
            if (err.target.readyState >= 2) { //if CLOSING or CLOSED
                this.displayError("Connection to QZ Tray was closed");
            } else {
                this.displayError("A connection error occurred, check log for details");
                console.error(err);
            }
        } else {
            this.displayError(err);
        }
    }

}
