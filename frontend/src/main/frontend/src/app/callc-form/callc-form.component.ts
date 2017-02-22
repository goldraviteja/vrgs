import { Component, OnInit } from '@angular/core';
import { CallcForm }    from './callcForm';
import { Router } from '@angular/router';
import {CallcService} from '../callc-services/callc.services';
import {Response} from '../response_status/response-status';

@Component({
  moduleId: module.id,
  selector: 'callc-form',
  templateUrl: './callc-form.component.html',
  styleUrls: ['./callc-form.component.css']
})

export class CallcFormComponent implements OnInit {

  constructor(private router : Router, private callcService : CallcService) { }

  searchCriteria =  ['ATN', 'WTN', 'USOC'];
  sortByValues = ['ATN,USOC', 'USOC,WTN'];
  monthList = [1,2,3,4,5,6,7,8,9,10,11,12];
  yearList = [2017,2016,2015,2014,2013,2012];
  isSearchByATN = false;
  isSearchByUSOC = false;
  isChecked = false;
  _response: Response;
      displayError = false;
    errorMessage: string;

  model = new CallcForm(1, 2017, '', '', false,false,false,false,'');

  onSelectSearchBy(searchBySelectValue : String, filterByATN, filterByUSOC, filterByZero, filterByMRC) : void {

    this.isSearchByATN = false;
    this.isSearchByUSOC = false;
  	if(searchBySelectValue === "ATN" || searchBySelectValue === "WTN") {
      this.isSearchByUSOC = true;
    }

    if(searchBySelectValue === "USOC") {
      this.isSearchByATN = true;
    }
    
    filterByATN.checked = false;
    filterByUSOC.checked = false;
    filterByZero.checked = false;
    filterByMRC.checked = false;
   }

    ngOnInit() {
  }

    onSubmit() {
      
      alert(this.model);
      this.callcService.post(this.model).subscribe(
        res => {this._response = res;
        alert(this._response);
        if (this._response != undefined && this._response.success ) {
            this.router.navigate( ['/callc-details'] );
        } 
        },
          err => {
                this.displayError = true;
                this.errorMessage = "Something went wrong! Please check with Administrator.";
            }
      );
  }
}
