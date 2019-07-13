import { Component, OnInit, ViewChild } from '@angular/core';
import { Action } from 'src/app/models/Action';
import { MatTableDataSource, MatSort, MatPaginator, ErrorStateMatcher } from '@angular/material';
import { ResponsableAction } from 'src/app/models/ResponsableAction';
import { FormGroup, FormControl, NgForm, FormGroupDirective, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ActionService } from 'src/app/services/action.service';
import { AnalysisGroupService } from 'src/app/services/analysis-group.service';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user.model';
import {interval} from "rxjs/internal/observable/interval";

import { startWith, switchMap } from 'rxjs/operators';
@Component({
  selector: 'app-reviewoftheeffectiveness',
  templateUrl: './reviewoftheeffectiveness.component.html',
  styleUrls: ['./reviewoftheeffectiveness.component.scss']
})
export class ReviewoftheeffectivenessComponent implements OnInit {

  public displayedColumns = ['Ref Action', 'Pos','Rsponsable Action','Action','Action Corrective', 'Response At','Status','Details','update', 'delete'];
  public dataSource = new MatTableDataSource<Action>();

  @ViewChild('ActionsForm') form;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  idPlan: string;

  listCorrectiveActions: Action[];
  listUser: ResponsableAction[];
  listReviewoftheeffectiveness: Action[];

  selectedAction = new Action();
  public FormReviewoftheeffectiveness: FormGroup;
  errorState = false;
  errorMatcher = new CustomErrorStateMatcher();

  constructor(private activeRoute: ActivatedRoute,
              private actionService: ActionService,
              private analysisGroupeService: AnalysisGroupService,
              private toastr: ToastrService, ) {
                this.idPlan = this.activeRoute.snapshot.params.id;

               }

  ngOnInit() {
    this.FormReviewoftheeffectiveness = new FormGroup({
      position: new FormControl('', [Validators.required]) ,
      description: new FormControl('', [Validators.required]),
      responsableAction: new FormControl('', [Validators.required]) ,
      dateResponse: new FormControl('', [Validators.required]),
      ActionCorrective:new FormControl('', [Validators.required])
    });
    this.getAllResponsableByGroupAnalyse();
    this.getAllCorrectiveActions();
this.resetObject();
this.getAllreviewoftheeffectiveness();
  }

  getAllreviewoftheeffectiveness(){
    const idPlan: string = this.activeRoute.snapshot.params.id;
    this.actionService.getActions(`Reviewoftheeffectiveness/getActionReviewoftheeffectivenessByPlanId/?idPlan=${idPlan}&ActionType=Review of the effectiveness`).subscribe(result => {
      this.dataSource.data = result as Action[];
      console.log("Allreviewoftheeffectiveness ..... ",result);
    });

  }


  getAllResponsableByGroupAnalyse() {
    const id: string = this.activeRoute.snapshot.params.id;
    interval(5000)
    .pipe(
          startWith(0),
          switchMap(() =>  this.analysisGroupeService.getAllResponsableByGroupAnalyse(`responsableAction/getAllResponsableByGroupAnalyse/${id}`))
        )
        .subscribe(res => this.listUser = res as ResponsableAction[] )
      ;
  }


  getAllCorrectiveActions(){
    const idPlan: string = this.activeRoute.snapshot.params.id;

    /* this.actionService.getActions(`ActionCorretive/getActionsCorrectiveByPlanId/?idPlan=${idPlan}&ActionType=Corrective Actions`).subscribe(result => {
      this.listCorrectiveActions = result as Action[];
     // console.log("All Ccorrective Actions for Etude efficcité ..... ",result);
    }); */

    interval(5000)
    .pipe(
          startWith(0),
          switchMap(() =>  this.actionService.getActions(`ActionCorretive/getActionsCorrectiveByPlanId/?idPlan=${idPlan}&ActionType=Corrective Actions`))
        )
        .subscribe(result => this.listCorrectiveActions = result as Action[] )
      ;


  }

  resetObject() {

    this.selectedAction = {
    _id: '',
    position: 0,
    description:'',
    responsableAction:new User(),
    dateResponse:  '',
    ActionCorrective:new Action()
      };
    }


    onEdit(action: Action) {
      this.selectedAction = action;
      console.log(action);
    }
      ngAfterViewInit(): void {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
     }
     redirectToDetailsAction(){

     }

     createReviewoftheeffectiveness(formReviewoftheeffectiveness){
      const idPlan: string = this.activeRoute.snapshot.params.id;

      const formReview:Action  = {

      refAction: "ACT" + Date.now(),
      position: formReviewoftheeffectiveness.position,
      status: "Non Attribué",
      description: formReviewoftheeffectiveness.description,
      responsableAction: formReviewoftheeffectiveness.responsableAction,
      dateResponse: formReviewoftheeffectiveness.dateResponse,
      ActionCorrective:formReviewoftheeffectiveness.ActionCorrective

      }


      if (this.selectedAction._id === '') {
        this.createAction(formReview, 'Reviewoftheeffectiveness/AddReviewoftheeffectiveness', idPlan, 'Review of the effectiveness');
      }else {
         this.updateAction(formReviewoftheeffectiveness,this.selectedAction._id,);
        }
    }


    updateAction(FormCorrectiveAction,id : string){
      console.log(id);
      console.log(FormCorrectiveAction);

     this.actionService.updateActionByCreator(`Reviewoftheeffectiveness/${id}`, FormCorrectiveAction).subscribe((result: Action)=>{
        this.toastr.info('Action Updated','Action Updated');
        this.getAllreviewoftheeffectiveness();

       // this.getAllcommande();
       if (!this.errorState) {
        this.form.resetForm();
      } else {
        this.form.reset();
      }
      this.resetObject();



      },(error)=>{
       this.toastr.error('Error Updated','Error  Updated');

        console.error(error);
      });
    }








    createAction(action:Action,route:string,idPlan : string,ActionType:string){

      this.actionService.createAction(`${route}/?idPlan=${idPlan}&ActionType=${ActionType}`, action)
      .subscribe((result) => {
        console.log(result);
        this.getAllreviewoftheeffectiveness();
        this.toastr.success(`${ActionType} Of this Plan created`);
      }, (error) => {
        console.error(error);
        this.toastr.warning(`${ActionType} Of this Plan Error`,error);
      });
      if (!this.errorState) {
        this.form.resetForm();
      } else {
        this.form.reset();
      }
      this.resetObject();
    }


























     applyFilter(filterValue: string) {
      this.dataSource.filter = filterValue;
    }
    onDelete(_id: string) {
     let apiUrlforDelete = `Reviewoftheeffectiveness/${_id}`;
      if (confirm('Are you sure to delete this record ?') == true) {
        this.actionService.deleteAction(apiUrlforDelete).subscribe((res) => {
          //this.refreshEmployeeList();
          //this.resetForm(form);
          this.toastr.error('Action deleted','Action deleted');
          this.getAllreviewoftheeffectiveness();
          console.log('Default deleted');
        });
      }
    }

}


export class CustomErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl, form: NgForm | FormGroupDirective | null) {
    return control && control.invalid && control.touched;
  }
}

