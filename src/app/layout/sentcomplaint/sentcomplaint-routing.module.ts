import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SentcomplaintComponent } from './sentcomplaint.component';

const routes: Routes = [
    {
        path: '',
        component: SentcomplaintComponent
    }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SentComplaintRoutingModule {}
