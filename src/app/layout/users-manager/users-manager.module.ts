import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersManagerComponent } from './users-manager.component';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { UsersMangerRoutingModule } from './users-manager-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';

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
import { UserModalComponent } from './user-modal/user-modal.component';
import { SucessdialogComponent } from './sucessdialog/sucessdialog.component';

@NgModule({
  declarations: [UsersManagerComponent, UserModalComponent, SucessdialogComponent],
  imports: [
    CommonModule,UsersMangerRoutingModule,MatCardModule,FormsModule,ReactiveFormsModule, MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,FlexLayoutModule,
    MatCardModule,MatPaginatorModule,
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
  ],  entryComponents: [UserModalComponent,SucessdialogComponent],

})
export class UserManagerModule { }
