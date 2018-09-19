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

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';

import { BankAccountComponent } from './BankAccount/BankAccount.component';
import { TrustAccountComponent } from './TrustAccount/TrustAccount.component';
import { OpenTrustAccountNoticeFormComponent } from './OpenTrustAccountNoticeForm/OpenTrustAccountNoticeForm.component';

import { ConveyancerComponent } from './Conveyancer/Conveyancer.component';
import { GovernanceComponent } from './Governance/Governance.component';
import { FinancialInstitutionComponent } from './FinancialInstitution/FinancialInstitution.component';

import { OpenTrustAccountTransactionComponent } from './OpenTrustAccountTransaction/OpenTrustAccountTransaction.component';
import { EndorseTrustAccountTransactionComponent } from './EndorseTrustAccountTransaction/EndorseTrustAccountTransaction.component';
import { ApproveTrustAccountTransactionComponent } from './ApproveTrustAccountTransaction/ApproveTrustAccountTransaction.component';
import { GenerateTestDataComponent } from './GenerateTestData/GenerateTestData.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'BankAccount', component: BankAccountComponent },
  { path: 'TrustAccount', component: TrustAccountComponent },
  { path: 'OpenTrustAccountNoticeForm', component: OpenTrustAccountNoticeFormComponent },
  { path: 'Conveyancer', component: ConveyancerComponent },
  { path: 'Governance', component: GovernanceComponent },
  { path: 'FinancialInstitution', component: FinancialInstitutionComponent },
  { path: 'OpenTrustAccountTransaction', component: OpenTrustAccountTransactionComponent },
  { path: 'EndorseTrustAccountTransaction', component: EndorseTrustAccountTransactionComponent },
  { path: 'ApproveTrustAccountTransaction', component: ApproveTrustAccountTransactionComponent },
  { path: 'GenerateTestData', component: GenerateTestDataComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
 imports: [RouterModule.forRoot(routes)],
 exports: [RouterModule],
 providers: []
})
export class AppRoutingModule { }
