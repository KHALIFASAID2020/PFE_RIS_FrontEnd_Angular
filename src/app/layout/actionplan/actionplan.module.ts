import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionplanComponent } from './actionplan.component';
import { ActionplanRoutingModule } from './actionplan-routing.module';
import { DetailsactionplanComponent } from './detailsactionplan/detailsactionplan.component';
import {MatTabsModule} from '@angular/material/tabs';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import {DetailsDialogComponent} from './detailsactionplan/containement-actions/dialogs/details-dialog/details-dialog.component';
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
import { ProblemDescriptionComponent } from './detailsactionplan/problem-description/problem-description.component';
import { CorrectiveActionsComponent } from './detailsactionplan/corrective-actions/corrective-actions.component';
import { ReviewoftheeffectivenessComponent } from './detailsactionplan/reviewoftheeffectiveness/reviewoftheeffectiveness.component';
import { PreventiveActionsComponent } from './detailsactionplan/preventive-actions/preventive-actions.component';
import { GroupcongratulationsComponent } from './detailsactionplan/groupcongratulations/groupcongratulations.component';
import { RootCauseComponent } from './detailsactionplan/root-cause/root-cause.component';
import { EditDialogComponent } from './detailsactionplan/containement-actions/dialogs/edit-dialog/edit-dialog.component';
import { DetailDescriptionComponent } from './detailsactionplan/problem-description/detail-description/detail-description.component';

@NgModule({
  declarations: [ActionplanComponent, DetailsactionplanComponent, ContainementActionsComponent, AnalysisTeamComponent, ProblemDescriptionComponent, CorrectiveActionsComponent, ReviewoftheeffectivenessComponent, PreventiveActionsComponent, GroupcongratulationsComponent, RootCauseComponent, DetailsDialogComponent, EditDialogComponent, DetailDescriptionComponent],
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
  ], entryComponents: [
    DetailsDialogComponent,EditDialogComponent,DetailDescriptionComponent
  ],
})
export class ActionplanModule { }
