import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionsComponent } from './actions.component';
import { ActionsRoutingModule } from './actions-routing.module';
@NgModule({
  declarations: [ActionsComponent],
  imports: [
    CommonModule, ActionsRoutingModule
  ]
})
export class ActionsModule { }
