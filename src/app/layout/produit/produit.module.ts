import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProduitComponent } from './produit.component';
import { ProduitRoutingModule } from './produit-routing.module';
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
import { ProduitService } from './produit.service';
@NgModule({
  declarations: [ProduitComponent],
  imports: [
    CommonModule,ProduitRoutingModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    CommonModule,FormsModule,ReactiveFormsModule,
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
  ],providers: [ProduitService]
})
export class ProduitModule { }
