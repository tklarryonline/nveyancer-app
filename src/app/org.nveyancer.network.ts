import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace org.nveyancer.network{
   export abstract class BaseParticipant extends Participant {
      email: string;
      name: string;
      address: Address;
   }
   export class Address {
      country: string;
      state: string;
      zip: string;
      city: string;
      street: string;
   }
   export class Conveyancer extends BaseParticipant {
   }
   export class Govenance extends BaseParticipant {
   }
   export class BankAccount extends Asset {
      id: string;
      bsb: number;
      accountNumber: number;
      owner: Conveyancer;
   }
   export class UpdateBankAccountTransaction extends Transaction {
      bankAccount: BankAccount;
      bsb: number;
      accountNumber: number;
   }
   export class BankAccountUpdatedEvent extends Event {
      bankAccount: BankAccount;
      oldBsb: number;
      oldAccountNumber: number;
      newBsb: number;
      newAccountNumber: number;
   }
// }
