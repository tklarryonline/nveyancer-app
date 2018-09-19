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

import { AngularTestPage } from './app.po';
import { ExpectedConditions, browser, element, by } from 'protractor';
import {} from 'jasmine';


describe('Starting tests for nveyancer-app', function() {
  let page: AngularTestPage;

  beforeEach(() => {
    page = new AngularTestPage();
  });

  it('website title should be nveyancer-app', () => {
    page.navigateTo('/');
    return browser.getTitle().then((result)=>{
      expect(result).toBe('nveyancer-app');
    })
  });

  it('network-name should be nveyancer-network@0.0.1',() => {
    element(by.css('.network-name')).getWebElement()
    .then((webElement) => {
      return webElement.getText();
    })
    .then((txt) => {
      expect(txt).toBe('nveyancer-network@0.0.1.bna');
    });
  });

  it('navbar-brand should be nveyancer-app',() => {
    element(by.css('.navbar-brand')).getWebElement()
    .then((webElement) => {
      return webElement.getText();
    })
    .then((txt) => {
      expect(txt).toBe('nveyancer-app');
    });
  });

  
    it('BankAccount component should be loadable',() => {
      page.navigateTo('/BankAccount');
      browser.findElement(by.id('assetName'))
      .then((assetName) => {
        return assetName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('BankAccount');
      });
    });

    it('BankAccount table should have 5 columns',() => {
      page.navigateTo('/BankAccount');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(5); // Addition of 1 for 'Action' column
      });
    });
  

  
    it('Conveyancer component should be loadable',() => {
      page.navigateTo('/Conveyancer');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Conveyancer');
      });
    });

    it('Conveyancer table should have 4 columns',() => {
      page.navigateTo('/Conveyancer');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(4); // Addition of 1 for 'Action' column
      });
    });
  
    it('Govenance component should be loadable',() => {
      page.navigateTo('/Govenance');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Govenance');
      });
    });

    it('Govenance table should have 4 columns',() => {
      page.navigateTo('/Govenance');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(4); // Addition of 1 for 'Action' column
      });
    });
  

  
    it('UpdateBankAccountTransaction component should be loadable',() => {
      page.navigateTo('/UpdateBankAccountTransaction');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('UpdateBankAccountTransaction');
      });
    });
  

});