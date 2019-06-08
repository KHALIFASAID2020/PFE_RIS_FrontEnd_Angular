import { Company } from '../company/iCompany';
import {Produit} from '../produit/produit-model';
export class Export {
  _id?: string;
  dateExport: string;
  quantity: string;
  company: Company;
  produit: Produit;
}
