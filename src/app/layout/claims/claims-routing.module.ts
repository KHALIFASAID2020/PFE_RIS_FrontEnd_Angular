import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClaimsComponent } from './claims.component';
import { DetailsComponent } from './details/details.component';
import { ListClaimsComponent } from './list-claims/list-claims.component';
import { UpdateComponent } from './update/update.component';

const routes: Routes = [
    {
        path: '',
        component: ClaimsComponent
    },
    { path: 'details/:id', component: DetailsComponent },
    { path: 'listclaims', component: ListClaimsComponent },
    { path: 'update/:id', component: UpdateComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ClaimsRoutingModule {}
