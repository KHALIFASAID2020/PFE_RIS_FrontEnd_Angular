import { User } from 'src/app/login/auth-data.model';
import { Produit } from '../produit/produit-model';
import { CompanyType } from '../company/CompanyType-model';
import { fault } from '../catalogfaults/ifault';
import { Company } from '../company/iCompany';

export class Complaint {
  _id?:string;
  refReclamation: string;
  typecompany: CompanyType;
  produit: Produit;
  description: string;
  daterep: string;
  datelimit: string;
  defaut: fault;
  company: Company;
  creator: string;
  destination:User[];
  destinationencopy:User[];
  quantity:string;
  createdAt?:string;
  //image:string
}

