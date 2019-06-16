import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionplanComponent } from './actionplan.component';
import { ActionplanRoutingModule } from './actionplan-routing.module';
import { DetailsactionplanComponent } from './detailsactionplan/detailsactionplan.component';
import {MatTabsModule} from '@angular/material/tabs';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
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
  MatToolbarModule,
  MatTooltipModule} from '@angular/material';
import { ContainementActionsComponent } from './detailsactionplan/containement-actions/containement-actions.component';
import { AnalysisTeamComponent } from './detailsactionplan/analysis-team/analysis-team.component';

@NgModule({
  declarations: [ActionplanComponent, DetailsactionplanComponent, ContainementActionsComponent, AnalysisTeamComponent],
  imports: [
    CommonModule, ActionplanRoutingModule,MatTabsModule,MatCardModule, MatAutocompleteModule,
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
    MatToolbarModule,
    MatTooltipModule,FormsModule,ReactiveFormsModule,FlexLayoutModule
  ]
})
export class ActionplanModule { }
