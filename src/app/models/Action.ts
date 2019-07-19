
import { ActionPlan } from './Action-Plan-model';
import { ActionType } from './ActionType';
import { User } from './user.model';
import { ResponsableAction } from './ResponsableAction';
import { RootCause } from './RootCause';
import { DocumentStandarisation } from './DocumentStandarisation';

export class Action {
  _id?: string;
  refAction?: string;
  position: number;
  status?: string;
  description:string;
  actionplan?:ActionPlan;
  responsableAction:User;
  typeAction?:ActionType;
  dateResponse:  string;
  responseDescription?:string;
  photo?:string;
  createdAt?:Date;
  cause?:RootCause;
  actioncorrective?:Action;
  Document?:DocumentStandarisation;
}


