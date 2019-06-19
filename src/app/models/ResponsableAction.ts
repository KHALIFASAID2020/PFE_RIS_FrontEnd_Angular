import { User } from './user.model';
import { AnalysisGroup } from './AnalysisiGroupModel';

 export class ResponsableAction {
  _id?: string;
  RefResponsable:string;
  responsableAction : User;
  groupeResponsableAction?:string;

 }
