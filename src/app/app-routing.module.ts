import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './login/auth.guard';

const routes: Routes = [
{
  path: 'login',
  loadChildren: './login/login.module#LoginModule'
},
{
  path : '',
  loadChildren: './layout/layout.module#LayoutModule',
  canActivate:[AuthGuard]
},
{path :'**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[]
})
export class AppRoutingModule { }
