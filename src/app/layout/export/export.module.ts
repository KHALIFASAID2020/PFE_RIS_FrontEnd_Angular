import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExportComponent } from './export.component';
import { ExportRoutingModule } from './export-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';

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
import { ExportService } from './export.service';
@NgModule({
  declarations: [ExportComponent],
  imports: [
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    CommonModule, ExportRoutingModule,FormsModule,ReactiveFormsModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,MatPaginatorModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,FlexLayoutModule,
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
    MatTooltipModule
  ],providers: [ExportService]
  //ExportService
})
export class ExportModule { }
