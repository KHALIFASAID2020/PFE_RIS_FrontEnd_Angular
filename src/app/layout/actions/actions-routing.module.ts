import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActionsComponent } from './actions.component';
import { DetailActionReceivedComponent } from './detail-action-received/detail-action-received.component';

const routes: Routes = [
    {
        path: '',
        component: ActionsComponent
    }, {
      path: 'detailsactionreceived/:id',
      component: DetailActionReceivedComponent
  }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ActionsRoutingModule {}
