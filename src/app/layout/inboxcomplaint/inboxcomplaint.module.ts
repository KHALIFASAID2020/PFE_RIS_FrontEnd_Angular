import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InboxComplaintRoutingModule } from './inboxcomplaint-routing.module';
import { InboxcomplaintComponent } from './inboxcomplaint.component';
@NgModule({
  declarations: [InboxcomplaintComponent],
  imports: [
    CommonModule, InboxComplaintRoutingModule
  ]
})
export class InboxcomplaintModule { }
