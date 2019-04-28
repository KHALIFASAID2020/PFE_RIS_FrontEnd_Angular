import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionplanComponent } from './actionplan.component';
import { ActionplanRoutingModule } from './actionplan-routing.module';
@NgModule({
  declarations: [ActionplanComponent],
  imports: [
    CommonModule, ActionplanRoutingModule
  ]
})
export class ActionplanModule { }
