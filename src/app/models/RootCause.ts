import { ActionPlan } from './Action-Plan-model';
import { AnalysisMethod } from './AnalysisMethod';

export class RootCause {
  _id?: string;
  rootCause :string;
  analysisMethod:AnalysisMethod;
  pourcent:string;
  actionplan?:ActionPlan;
}

