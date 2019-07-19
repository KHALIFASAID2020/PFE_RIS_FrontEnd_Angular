import { User } from 'src/app/models/auth-data.model';
import { Produit } from '../../models/produit-model';
import { CompanyType } from '../../models/CompanyType-model';
import { fault } from '../../models/ifault';
import { Company } from '../../models/iCompany';

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
  photo?:string;
  destination:User;
  quantity:string;
  createdAt?:string;
  //image:string
}

