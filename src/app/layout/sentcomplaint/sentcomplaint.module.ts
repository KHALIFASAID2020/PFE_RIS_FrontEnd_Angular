import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SentcomplaintComponent } from './sentcomplaint.component';
import { SentComplaintRoutingModule } from './sentcomplaint-routing.module';

@NgModule({
  declarations: [SentcomplaintComponent],
  imports: [
    CommonModule,SentComplaintRoutingModule
  ]
})
export class SentcomplaintModule { }
