import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { AuthGuard } from '../login/auth.guard';
const routes: Routes = [
  {
      path: '',
      component: LayoutComponent ,
      children: [
          {
              path: '',
              redirectTo: 'dashboard'
          },
          {
              path: 'dashboard',
              loadChildren: './dashboard/dashboard.module#DashboardModule'
          },
          {
            path: 'claims',
            loadChildren: './claims/claims.module#ClaimsModule'
          },
          {
            path: 'inboxcomplaint',
            loadChildren: './inboxcomplaint/inboxcomplaint.module#InboxcomplaintModule'
          },
          {
            path: 'sentcomplaint',
            loadChildren: './sentcomplaint/sentcomplaint.module#SentcomplaintModule'
          },
          {
            path: 'actionplan',
            loadChildren: './actionplan/actionplan.module#ActionplanModule'
          },
          {
            path: 'actions',
            loadChildren: './actions/actions.module#ActionsModule'
          },
          {
            path: 'statistics',
            loadChildren: './statistic/statistic.module#StatisticModule'
          },
          {
            path: 'users',
            loadChildren: './users-manager/users-manager.module#UserManagerModule'
          },
          {
            path: 'catalogfaults',
            loadChildren: './catalogfaults/catalogfaults.module#CatalogfaultsModule'
          },{
            path: 'actiontype',
            loadChildren: './action-type/action-type.module#ActiontypeModule'
          },{
            path: 'company',
            loadChildren: './company/company.module#CompanyModule'
          }
          //ActiontypeModule
        ]
  }
];

          /*,
          {
              path: 'charts',
              loadChildren: './charts/charts.module#ChartsModule'
          },
          {
              path: 'components',
              loadChildren:
                  './material-components/material-components.module#MaterialComponentsModule'
          },
          {
              path: 'forms',
              loadChildren: './forms/forms.module#FormsModule'
          },
          {
              path: 'grid',
              loadChildren: './grid/grid.module#GridModule'
          },
          {
              path: 'tables',
              loadChildren: './tables/tables.module#TablesModule'
          },
          {
              path: 'blank-page',
              loadChildren: './blank-page/blank-page.module#BlankPageModule'
          }
      ]*/



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
