
import { User } from 'src/app/models/auth-data.model';
import { ActionPlan } from './Action-Plan-model';
import { ActionType } from './ActionType';

export class Action {
  _id?: string;
  refAction: string;
  position: string;
  status: string;
  description:string;
  actionplan?:ActionPlan;
  responsableAction:User;
  typeAction?:ActionType;
  dateResponse:  Date;
}


