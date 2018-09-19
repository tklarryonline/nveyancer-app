/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { OpenTrustAccountTransactionService } from './OpenTrustAccountTransaction.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-opentrustaccounttransaction',
  templateUrl: './OpenTrustAccountTransaction.component.html',
  styleUrls: ['./OpenTrustAccountTransaction.component.css'],
  providers: [OpenTrustAccountTransactionService]
})
export class OpenTrustAccountTransactionComponent implements OnInit {

  myForm: FormGroup;

  private allTransactions;
  private Transaction;
  private currentId;
  private errorMessage;

  conveyancer = new FormControl('', Validators.required);
  institution = new FormControl('', Validators.required);
  trustAccountName = new FormControl('', Validators.required);
  bsb = new FormControl('', Validators.required);
  accountNumber = new FormControl('', Validators.required);
  transactionId = new FormControl('', Validators.required);
  timestamp = new FormControl('', Validators.required);


  constructor(private serviceOpenTrustAccountTransaction: OpenTrustAccountTransactionService, fb: FormBuilder) {
    this.myForm = fb.group({
      conveyancer: this.conveyancer,
      institution: this.institution,
      trustAccountName: this.trustAccountName,
      bsb: this.bsb,
      accountNumber: this.accountNumber,
      transactionId: this.transactionId,
      timestamp: this.timestamp
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceOpenTrustAccountTransaction.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(transaction => {
        tempList.push(transaction);
      });
      this.allTransactions = tempList;
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the transaction field to update
   * @param {any} value - the enumeration value for which to toggle the checked state
   */
  changeArrayValue(name: string, value: any): void {
    const index = this[name].value.indexOf(value);
    if (index === -1) {
      this[name].value.push(value);
    } else {
      this[name].value.splice(index, 1);
    }
  }

	/**
	 * Checkbox helper, determining whether an enumeration value should be selected or not (for array enumeration values
   * only). This is used for checkboxes in the transaction updateDialog.
   * @param {String} name - the name of the transaction field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified transaction field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addTransaction(form: any): Promise<any> {
    this.Transaction = {
      $class: 'org.nveyancer.network.OpenTrustAccountTransaction',
      'conveyancer': this.conveyancer.value,
      'institution': this.institution.value,
      'trustAccountName': this.trustAccountName.value,
      'bsb': this.bsb.value,
      'accountNumber': this.accountNumber.value,
      'transactionId': this.transactionId.value,
      'timestamp': this.timestamp.value
    };

    this.myForm.setValue({
      'conveyancer': null,
      'institution': null,
      'trustAccountName': null,
      'bsb': null,
      'accountNumber': null,
      'transactionId': null,
      'timestamp': null
    });

    return this.serviceOpenTrustAccountTransaction.addTransaction(this.Transaction)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'conveyancer': null,
        'institution': null,
        'trustAccountName': null,
        'bsb': null,
        'accountNumber': null,
        'transactionId': null,
        'timestamp': null
      });
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else {
        this.errorMessage = error;
      }
    });
  }

  updateTransaction(form: any): Promise<any> {
    this.Transaction = {
      $class: 'org.nveyancer.network.OpenTrustAccountTransaction',
      'conveyancer': this.conveyancer.value,
      'institution': this.institution.value,
      'trustAccountName': this.trustAccountName.value,
      'bsb': this.bsb.value,
      'accountNumber': this.accountNumber.value,
      'timestamp': this.timestamp.value
    };

    return this.serviceOpenTrustAccountTransaction.updateTransaction(form.get('transactionId').value, this.Transaction)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
      this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  deleteTransaction(): Promise<any> {

    return this.serviceOpenTrustAccountTransaction.deleteTransaction(this.currentId)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  setId(id: any): void {
    this.currentId = id;
  }

  getForm(id: any): Promise<any> {

    return this.serviceOpenTrustAccountTransaction.getTransaction(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'conveyancer': null,
        'institution': null,
        'trustAccountName': null,
        'bsb': null,
        'accountNumber': null,
        'transactionId': null,
        'timestamp': null
      };

      if (result.conveyancer) {
        formObject.conveyancer = result.conveyancer;
      } else {
        formObject.conveyancer = null;
      }

      if (result.institution) {
        formObject.institution = result.institution;
      } else {
        formObject.institution = null;
      }

      if (result.trustAccountName) {
        formObject.trustAccountName = result.trustAccountName;
      } else {
        formObject.trustAccountName = null;
      }

      if (result.bsb) {
        formObject.bsb = result.bsb;
      } else {
        formObject.bsb = null;
      }

      if (result.accountNumber) {
        formObject.accountNumber = result.accountNumber;
      } else {
        formObject.accountNumber = null;
      }

      if (result.transactionId) {
        formObject.transactionId = result.transactionId;
      } else {
        formObject.transactionId = null;
      }

      if (result.timestamp) {
        formObject.timestamp = result.timestamp;
      } else {
        formObject.timestamp = null;
      }

      this.myForm.setValue(formObject);

    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
      this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  resetForm(): void {
    this.myForm.setValue({
      'conveyancer': null,
      'institution': null,
      'trustAccountName': null,
      'bsb': null,
      'accountNumber': null,
      'transactionId': null,
      'timestamp': null
    });
  }
}
