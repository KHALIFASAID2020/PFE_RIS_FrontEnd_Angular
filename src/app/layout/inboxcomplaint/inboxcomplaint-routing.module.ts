import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InboxcomplaintComponent } from './inboxcomplaint.component';
import { DetailsInboxComplaintComponent } from './details-inbox-complaint/details-inbox-complaint.component';

const routes: Routes = [
    {
        path: '',
        component: InboxcomplaintComponent
    },
    {
      path: 'detailsInboxComplaint/:id',
      component: DetailsInboxComplaintComponent
  }

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InboxComplaintRoutingModule {}
