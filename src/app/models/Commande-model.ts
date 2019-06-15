import { Company } from './iCompany';
import {Produit} from './produit-model';
export class Commande {
  _id?: string;
  dateDelivery: string;
  quantity: string;
  company: Company;
  produit: Produit;
}

/*
produit:{
  type:mongoose.Schema.Types.ObjectId,
  ref:'Produit'
},
dateDelivery:{
  type: String, required: true
},
company:{
  type:mongoose.Schema.Types.ObjectId,
  ref:'Company'
},
quantity:{
  type: Number, required: true
} */
