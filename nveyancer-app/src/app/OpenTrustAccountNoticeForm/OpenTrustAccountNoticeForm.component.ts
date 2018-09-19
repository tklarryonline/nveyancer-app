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
import { OpenTrustAccountNoticeFormService } from './OpenTrustAccountNoticeForm.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-opentrustaccountnoticeform',
  templateUrl: './OpenTrustAccountNoticeForm.component.html',
  styleUrls: ['./OpenTrustAccountNoticeForm.component.css'],
  providers: [OpenTrustAccountNoticeFormService]
})
export class OpenTrustAccountNoticeFormComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
  private errorMessage;

  id = new FormControl('', Validators.required);
  conveyancer = new FormControl('', Validators.required);
  institution = new FormControl('', Validators.required);
  officer = new FormControl('', Validators.required);
  trustAccount = new FormControl('', Validators.required);
  ownerSignedDate = new FormControl('', Validators.required);
  isInstitutionEndorsed = new FormControl('', Validators.required);
  institutionSignedDate = new FormControl('', Validators.required);
  isApproved = new FormControl('', Validators.required);
  approvalDate = new FormControl('', Validators.required);

  constructor(public serviceOpenTrustAccountNoticeForm: OpenTrustAccountNoticeFormService, fb: FormBuilder) {
    this.myForm = fb.group({
      id: this.id,
      conveyancer: this.conveyancer,
      institution: this.institution,
      officer: this.officer,
      trustAccount: this.trustAccount,
      ownerSignedDate: this.ownerSignedDate,
      isInstitutionEndorsed: this.isInstitutionEndorsed,
      institutionSignedDate: this.institutionSignedDate,
      isApproved: this.isApproved,
      approvalDate: this.approvalDate
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceOpenTrustAccountNoticeForm.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(asset => {
        tempList.push(asset);
      });
      this.allAssets = tempList;
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
   * @param {String} name - the name of the asset field to update
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
   * only). This is used for checkboxes in the asset updateDialog.
   * @param {String} name - the name of the asset field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified asset field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'org.nveyancer.network.OpenTrustAccountNoticeForm',
      'id': this.id.value,
      'conveyancer': this.conveyancer.value,
      'institution': this.institution.value,
      'officer': this.officer.value,
      'trustAccount': this.trustAccount.value,
      'ownerSignedDate': this.ownerSignedDate.value,
      'isInstitutionEndorsed': this.isInstitutionEndorsed.value,
      'institutionSignedDate': this.institutionSignedDate.value,
      'isApproved': this.isApproved.value,
      'approvalDate': this.approvalDate.value
    };

    this.myForm.setValue({
      'id': null,
      'conveyancer': null,
      'institution': null,
      'officer': null,
      'trustAccount': null,
      'ownerSignedDate': null,
      'isInstitutionEndorsed': null,
      'institutionSignedDate': null,
      'isApproved': null,
      'approvalDate': null
    });

    return this.serviceOpenTrustAccountNoticeForm.addAsset(this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'id': null,
        'conveyancer': null,
        'institution': null,
        'officer': null,
        'trustAccount': null,
        'ownerSignedDate': null,
        'isInstitutionEndorsed': null,
        'institutionSignedDate': null,
        'isApproved': null,
        'approvalDate': null
      });
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
          this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else {
          this.errorMessage = error;
      }
    });
  }


  updateAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'org.nveyancer.network.OpenTrustAccountNoticeForm',
      'conveyancer': this.conveyancer.value,
      'institution': this.institution.value,
      'officer': this.officer.value,
      'trustAccount': this.trustAccount.value,
      'ownerSignedDate': this.ownerSignedDate.value,
      'isInstitutionEndorsed': this.isInstitutionEndorsed.value,
      'institutionSignedDate': this.institutionSignedDate.value,
      'isApproved': this.isApproved.value,
      'approvalDate': this.approvalDate.value
    };

    return this.serviceOpenTrustAccountNoticeForm.updateAsset(form.get('id').value, this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
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


  deleteAsset(): Promise<any> {

    return this.serviceOpenTrustAccountNoticeForm.deleteAsset(this.currentId)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
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

    return this.serviceOpenTrustAccountNoticeForm.getAsset(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'id': null,
        'conveyancer': null,
        'institution': null,
        'officer': null,
        'trustAccount': null,
        'ownerSignedDate': null,
        'isInstitutionEndorsed': null,
        'institutionSignedDate': null,
        'isApproved': null,
        'approvalDate': null
      };

      if (result.id) {
        formObject.id = result.id;
      } else {
        formObject.id = null;
      }

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

      if (result.officer) {
        formObject.officer = result.officer;
      } else {
        formObject.officer = null;
      }

      if (result.trustAccount) {
        formObject.trustAccount = result.trustAccount;
      } else {
        formObject.trustAccount = null;
      }

      if (result.ownerSignedDate) {
        formObject.ownerSignedDate = result.ownerSignedDate;
      } else {
        formObject.ownerSignedDate = null;
      }

      if (result.isInstitutionEndorsed) {
        formObject.isInstitutionEndorsed = result.isInstitutionEndorsed;
      } else {
        formObject.isInstitutionEndorsed = null;
      }

      if (result.institutionSignedDate) {
        formObject.institutionSignedDate = result.institutionSignedDate;
      } else {
        formObject.institutionSignedDate = null;
      }

      if (result.isApproved) {
        formObject.isApproved = result.isApproved;
      } else {
        formObject.isApproved = null;
      }

      if (result.approvalDate) {
        formObject.approvalDate = result.approvalDate;
      } else {
        formObject.approvalDate = null;
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
      'id': null,
      'conveyancer': null,
      'institution': null,
      'officer': null,
      'trustAccount': null,
      'ownerSignedDate': null,
      'isInstitutionEndorsed': null,
      'institutionSignedDate': null,
      'isApproved': null,
      'approvalDate': null
      });
  }

}
