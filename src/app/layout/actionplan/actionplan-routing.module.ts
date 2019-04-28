import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActionplanComponent } from './actionplan.component';

const routes: Routes = [
    {
        path: '',
        component: ActionplanComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ActionplanRoutingModule {}
