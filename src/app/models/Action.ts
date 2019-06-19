
import { ActionPlan } from './Action-Plan-model';
import { ActionType } from './ActionType';
import { User } from './user.model';
import { ResponsableAction } from './ResponsableAction';

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
}


