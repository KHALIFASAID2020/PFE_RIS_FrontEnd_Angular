import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatCardModule, MatIconModule, MatTableModule, MatFormFieldModule } from '@angular/material';
import { StatModule } from './stat/stat.module';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatCardModule,
        MatCardModule,
        MatTableModule,StatModule,
        MatButtonModule,MatFormFieldModule,
        MatIconModule,
        FlexLayoutModule.withConfig({addFlexToParent: false})
  ]
})
export class DashboardModule { }
