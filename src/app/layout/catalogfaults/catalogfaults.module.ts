import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';



import { CatalogfaultsComponent } from './catalogfaults.component';
import { CatalogFaultRoutingModule } from './catalogfaults-routing.module';
import { FaultService } from './fault.service';
import { PusherService } from './pusher.service';
import { HttpClientModule } from '@angular/common/http';



import {MatCardModule, MatAutocompleteModule,
  MatButtonModule,
  MatPaginatorModule,
  MatButtonToggleModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule} from '@angular/material';
@NgModule({
  declarations: [CatalogfaultsComponent],
  imports: [HttpClientModule,
    CommonModule,MatButtonModule,CatalogFaultRoutingModule,
    MatButtonToggleModule,
    MatCardModule,MatPaginatorModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,FlexLayoutModule,
    MatDialogModule,FormsModule,ReactiveFormsModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule
  ],  providers: []

})
export class CatalogfaultsModule { }
