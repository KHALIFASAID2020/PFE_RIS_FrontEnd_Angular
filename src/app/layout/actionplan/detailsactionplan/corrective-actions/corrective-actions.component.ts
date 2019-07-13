import { Component, OnInit, ViewChild } from '@angular/core';
import { Action } from 'src/app/models/Action';
import { ActivatedRoute } from '@angular/router';
import { ActionService } from 'src/app/services/action.service';

import { AnalysisGroupService } from 'src/app/services/analysis-group.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, Validators, FormBuilder, NgForm,FormGroupDirective } from '@angular/forms';
import { ResponsableAction } from 'src/app/models/ResponsableAction';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog, ErrorStateMatcher } from '@angular/material';
import { User } from 'src/app/models/user.model';
import { RootCause } from 'src/app/models/RootCause';
import { RootCauseService } from 'src/app/services/root-cause.service';
import {interval} from "rxjs/internal/observable/interval";

import { startWith, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-corrective-actions',
  templateUrl: './corrective-actions.component.html',
  styleUrls: ['./corrective-actions.component.scss']
})
export class CorrectiveActionsComponent implements OnInit {
  public displayedColumns = ['Ref Action','Pos','Rsponsable Action','Action','Cause', 'Response At','Status','Details','update', 'delete'];
  public dataSource = new MatTableDataSource<Action>();

  @ViewChild('ActionsForm') form;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  idPlan: string;

  listCorrectiveActions : Action[];
  listUser: ResponsableAction[];
  listCause: RootCause[];

  selectedAction = new Action();
  public FormCorrectiveActions: FormGroup;
  errorState = false;
  errorMatcher = new CustomErrorStateMatcher();

  constructor(private activeRoute: ActivatedRoute,
              private actionService: ActionService,
              private rootCauseService : RootCauseService,
              private analysisGroupeService : AnalysisGroupService,
              private toastr: ToastrService,
              public dialog: MatDialog,private formBuilder: FormBuilder
              ) {
                this.idPlan = this.activeRoute.snapshot.params.id;

              }

  ngOnInit() {
    this.FormCorrectiveActions = new FormGroup({
      position: new FormControl('', [Validators.required]) ,
      description: new FormControl('', [Validators.required]),
      responsableAction: new FormControl('', [Validators.required]) ,
      dateResponse: new FormControl('', [Validators.required]),
      cause:new FormControl('', [Validators.required])
    });
this.AllRootCause();

    this.resetObject();
    this.getAllCorrectiveActions();
    this.getAllResponsableByGroupAnalyse();
  }


  AllRootCause() {
    const id: string = this.activeRoute.snapshot.params.id;
  /*   this.rootCauseService.getAllRootCauseByActionPlan(`cause/getAllRootCauseByActionPlan/${id}`).subscribe(result => {
      this.listCause = result as RootCause[];

      //this.listRootCause = result as RootCause[];
      console.log('Root Cause',result);
     // this.listUser = result as ResponsableAction[];
    });

 */
    interval(5000)
    .pipe(
          startWith(0),
          switchMap(() =>  this.rootCauseService.getAllRootCauseByActionPlan(`cause/getAllRootCauseByActionPlan/${id}`))
        )
        .subscribe(result => this.listCause = result as RootCause[] )
      ;


  }


  resetObject() {

    this.selectedAction = {
    _id: '',
    position: 0,
    description:'',
    responsableAction:new User(),
    dateResponse:  '',
    cause:new RootCause()
      };
    }

  getAllResponsableByGroupAnalyse() {
    const id: string = this.activeRoute.snapshot.params.id;
   /*  this.analysisGroupeService.getAllResponsableByGroupAnalyse(`responsableAction/getAllResponsableByGroupAnalyse/${id}`).subscribe(result => {
      //this.listResponsable = result as User[];
      console.log(result);
      this.listUser = result as ResponsableAction[];

    }); */
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

    this.actionService.getActions(`ActionCorretive/getActionsCorrectiveByPlanId/?idPlan=${idPlan}&ActionType=Corrective Actions`).subscribe(result => {
      this.dataSource.data = result as Action[];
      console.log("All Ccorrective Actions ..... ",result);
    });
  }



createCorrectiveAction(FormCorrectiveAction){
  const idPlan: string = this.activeRoute.snapshot.params.id;

  const correctiveAction:Action  = {

  refAction: "ACT" + Date.now(),
  position: FormCorrectiveAction.position,
  status: "Non Attribué",
  description: FormCorrectiveAction.description,
  responsableAction: FormCorrectiveAction.responsableAction,
  dateResponse: FormCorrectiveAction.dateResponse,
  cause:FormCorrectiveAction.cause

  }


  if (this.selectedAction._id === '') {
    this.createAction(correctiveAction, 'ActionCorretive/AddActionCorrective', idPlan, 'Corrective Actions');
  }else {
     this.updateAction(FormCorrectiveAction,this.selectedAction._id,);
    }
}


updateAction(FormCorrectiveAction,id : string){
  console.log(id);
  console.log(FormCorrectiveAction);

 this.actionService.updateActionByCreator(`ActionCorretive/${id}`, FormCorrectiveAction).subscribe((result: Action)=>{
    this.toastr.info('Action Updated','Action Updated');
    this.getAllCorrectiveActions();

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
    this.getAllCorrectiveActions();
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
/* getAllContainementActions(){
  const idPlan: string = this.activeRoute.snapshot.params.id;

  this.actionService.getActions(`Action/getActions/?idPlan=${idPlan}&ActionType=Containement Actions`).subscribe(result => {
    this.listContainementActions = result as Action[];
    console.log("All Containement Actions ",this.listContainementActions);
  });
}
} */


redirectToDetailsAction(id: string) {

 /*  const dialogRef = this.dialog.open(DetailsDialogComponent, {
    data: {id: id}
  });

  dialogRef.afterClosed().subscribe(result => {

     // const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.id === this.id);
      // for delete we use splice in order to remove single object from DataService
      //his.exampleDatabase.dataChange.value.splice(foundIndex, 1);
     // this.refreshTable();
     this.getAllContainementActions();

  });
  console.log(id);

 */
}


onEdit(action: Action) {
  this.selectedAction = action;
  console.log(action);
}
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
 }


 applyFilter(filterValue: string) {
  this.dataSource.filter = filterValue;
}
onDelete(_id: string) {
 let apiUrlforDelete = `ActionCorretive/${_id}`;
  if (confirm('Are you sure to delete this record ?') == true) {
    this.actionService.deleteAction(apiUrlforDelete).subscribe((res) => {
      //this.refreshEmployeeList();
      //this.resetForm(form);
      this.toastr.error('Action deleted','Action deleted');
      this.getAllCorrectiveActions();
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

