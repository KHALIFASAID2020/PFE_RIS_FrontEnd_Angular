import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClaimsComponent } from './claims.component';
import { ClaimsRoutingModule } from './claims-routing.module';
@NgModule({
  declarations: [ClaimsComponent],
  imports: [
    CommonModule, ClaimsRoutingModule
  ]
})
export class ClaimsModule { }
