import { User } from 'src/app/models/auth-data.model';
import { Complaint } from '../layout/claims/complaint.model';

export class ActionPlan {
  _id?: string;
  RefActionPlan: string;
  reclamation: Complaint;
  teamLeader: User;
  status:string;
}

