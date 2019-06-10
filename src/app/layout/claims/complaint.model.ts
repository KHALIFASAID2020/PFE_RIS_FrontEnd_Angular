import { User } from 'src/app/login/auth-data.model';
import { Produit } from '../produit/produit-model';
import { CompanyType } from '../company/CompanyType-model';
import { fault } from '../catalogfaults/ifault';
import { Company } from '../company/iCompany';

export class Complaint {
  _id?:string;
  refReclamation: string;
  typecompanyId: CompanyType;
  produitId: Produit;
  description: string;
  daterep: string;
  datelimit: string;
  defautId: fault;
  companyId: Company;
  creatorId: string;
  destinationId:User[];
  destinationencopy:User[];
  quantity:string;
  createdAt?:string;
  //image:string
}

