import { User } from './user.model';
import { AnalysisGroup } from './AnalysisiGroupModel';

 export class ResponsableAction {
  id?: string;
  RefResponsable:string;
  responsableAction : User;
  groupeResponsableAction?:string;

 }
