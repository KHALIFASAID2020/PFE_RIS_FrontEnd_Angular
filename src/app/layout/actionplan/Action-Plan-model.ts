import { User } from 'src/app/login/auth-data.model';
import { Complaint } from '../claims/complaint.model';

export class ActionPlan {
  _id?: string;
  RefActionPlan: string;
  reclamation: Complaint;
  teamLeader: User;
  status:string;
}

