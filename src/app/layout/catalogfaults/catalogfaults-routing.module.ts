import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogfaultsComponent } from './catalogfaults.component';

const routes: Routes = [
    {
        path: '',
        component: CatalogfaultsComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CatalogFaultRoutingModule {}
