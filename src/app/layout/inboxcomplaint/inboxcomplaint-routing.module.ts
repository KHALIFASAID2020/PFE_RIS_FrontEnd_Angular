import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InboxcomplaintComponent } from './inboxcomplaint.component';

const routes: Routes = [
    {
        path: '',
        component: InboxcomplaintComponent
    }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InboxComplaintRoutingModule {}
