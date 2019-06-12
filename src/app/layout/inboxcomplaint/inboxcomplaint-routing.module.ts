import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InboxcomplaintComponent } from './inboxcomplaint.component';
import { DetailsInboxComplaintComponent } from './details-inbox-complaint/details-inbox-complaint.component';
import { UpdateAffectedActionPlanComponent } from './update-affected-action-plan/update-affected-action-plan.component';

const routes: Routes = [
    {
        path: '',
        component: InboxcomplaintComponent
    },
    {
      path: 'detailsInboxComplaint/:id',
      component: DetailsInboxComplaintComponent
  },
  {
    path: 'updateAffectedActionPlan/:id',
    component: UpdateAffectedActionPlanComponent
}

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InboxComplaintRoutingModule {}
