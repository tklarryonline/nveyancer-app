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
      licenceNumber: string;
   }
   export class Governance extends BaseParticipant {
   }
   export class FinancialInstitution extends Participant {
      id: string;
      name: string;
      address: Address;
   }
   export class BankAccount extends Asset {
      id: string;
      bsb: number;
      accountNumber: number;
      owner: Conveyancer;
   }
   export class TrustAccount extends Asset {
      id: string;
      owner: Conveyancer;
      institution: FinancialInstitution;
      name: string;
      bsb: string;
      accountNumber: string;
      isVerified: boolean;
   }
   export class OpenTrustAccountNoticeForm extends Asset {
      id: string;
      conveyancer: Conveyancer;
      institution: FinancialInstitution;
      officer: Governance;
      trustAccount: TrustAccount;
      ownerSignedDate: Date;
      isInstitutionEndorsed: boolean;
      institutionSignedDate: Date;
      isApproved: boolean;
      approvalDate: Date;
   }
   export abstract class BaseTrustAccountTransaction extends Transaction {
      form: OpenTrustAccountNoticeForm;
   }
   export class OpenTrustAccountTransaction extends Transaction {
      conveyancer: Conveyancer;
      institution: FinancialInstitution;
      trustAccountName: string;
      bsb: string;
      accountNumber: string;
   }
   export class EndorseTrustAccountTransaction extends BaseTrustAccountTransaction {
      endorse: boolean;
   }
   export class ApproveTrustAccountTransaction extends BaseTrustAccountTransaction {
      officer: Governance;
      approve: boolean;
   }
   export class GenerateTestData extends Transaction {
   }
   export abstract class BaseTrustAccountEvent extends Event {
      form: OpenTrustAccountNoticeForm;
   }
   export class TrustAccountOpenedEvent extends BaseTrustAccountEvent {
   }
   export class TrustAccountEndorsedEvent extends BaseTrustAccountEvent {
   }
   export class TrustAccountApprovedEvent extends BaseTrustAccountEvent {
   }
// }
