import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActionplanComponent } from './actionplan.component';
import { DetailsactionplanComponent } from './detailsactionplan/detailsactionplan.component';

const routes: Routes = [
    {
        path: '',
        component: ActionplanComponent
    },
    {
      path: 'detailsplan/:id',
      component: DetailsactionplanComponent
  }
    //DetailsactionplanComponent
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ActionplanRoutingModule {}
