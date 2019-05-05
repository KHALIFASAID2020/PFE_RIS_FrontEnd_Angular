import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersManagerComponent } from './users-manager.component';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { UsersMangerRoutingModule } from './users-manager-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';

import {MatCardModule, MatAutocompleteModule,
  MatButtonModule,
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
  declarations: [UsersManagerComponent],
  imports: [
    CommonModule,UsersMangerRoutingModule,MatCardModule,FormsModule,ReactiveFormsModule, MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,FlexLayoutModule,
    MatCardModule,
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
    MatTooltipModule
  ]
})
export class UserManagerModule { }
