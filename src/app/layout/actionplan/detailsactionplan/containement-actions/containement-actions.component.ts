import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Action } from 'src/app/models/Action';
import {interval} from "rxjs/internal/observable/interval";
import {startWith, switchMap} from "rxjs/operators";
import { FormGroup, FormControl, Validators, NgForm, FormGroupDirective, FormBuilder } from '@angular/forms';
import { ActionService } from 'src/app/services/action.service';
import { ResponsableAction } from 'src/app/models/ResponsableAction';
import { AnalysisGroupService } from 'src/app/services/analysis-group.service';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource, MatSort, MatPaginator, ErrorStateMatcher, MatDialog } from '@angular/material';
import { DetailsDialogComponent } from './dialogs/details-dialog/details-dialog.component';
import { EditDialogComponent } from './dialogs/edit-dialog/edit-dialog.component';
import { User } from 'src/app/models/user.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-containement-actions',
  templateUrl: './containement-actions.component.html',
  styleUrls: ['./containement-actions.component.scss']
})
export class ContainementActionsComponent implements OnInit {
  public displayedColumns = ['Ref Action','Pos','Rsponsable Action','Action','created At', 'Response At','Status','Details','update', 'delete'];

  public dataSource = new MatTableDataSource<Action>();
  listContainementActions: Action[];
  selectedAction = new Action();
  listUser: ResponsableAction[];
  public FormContainementActions: FormGroup;
  @ViewChild('ActionsForm') form;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  errorState = false;
  errorMatcher = new CustomErrorStateMatcher();
idPlan: string;
  constructor(private activeRoute: ActivatedRoute,
              private actionService: ActionService,
              private analysisGroupeService : AnalysisGroupService,
              private toastr: ToastrService,
              public dialog: MatDialog,private formBuilder: FormBuilder) {
     this.idPlan = this.activeRoute.snapshot.params.id;
  }

  ngOnInit() {

    this.FormContainementActions  = this.formBuilder.group({
      position: ['', Validators.required],
      description: ['', Validators.required],
      dateResponse: ['', Validators.required],
      responsableAction: ['', Validators.required]
    });


    this.resetObject();
    this.getAllContainementActions();
    this.getAllResponsableByGroupAnalyse();
    //this.getAllResponsableByGroupAnalyse();

  }

  resetObject() {

  this.selectedAction = {
  _id: '',
  position: 0,
  description:'',
  responsableAction:new User(),
  dateResponse:  '',
    };
  }

  getAllContainementActions(){
    const idPlan: string = this.activeRoute.snapshot.params.id;

    this.actionService.getActions(`Action/getActions/?idPlan=${idPlan}&ActionType=Containement Actions`).subscribe(result => {
     // this.listContainementActions = result as Action[];
      //console.log("All Containement Actions ",this.listContainementActions);
      this.dataSource.data = result as Action[];

    });
  }

getAllResponsableByGroupAnalyse() {
 const id: string = this.activeRoute.snapshot.params.id;
 /* this.analysisGroupeService.getgetAllResponsableByGroupAnalyse(`responsableAction/getAllResponsableByGroupAnalyse/${id}`).subscribe(result => {
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


createContainementAction(FormContainementAction){
  const idPlan: string = this.activeRoute.snapshot.params.id;

  const ContainementAction:Action  = {

  refAction: "ACT" + Date.now(),
  position: FormContainementAction.position,
  status: "Non Attribué",
  description: FormContainementAction.description,
  responsableAction: FormContainementAction.responsableAction,
  dateResponse: FormContainementAction.dateResponse

  }
  if (this.selectedAction._id === '') {
  this.createAction(ContainementAction, 'Action/AddAction', idPlan, 'Containement Actions');
  }else {
   this.updateAction(FormContainementAction,this.selectedAction._id,);
  }
}




updateAction(FormContainementAction,id : string){
  console.log(id);
  console.log(FormContainementAction);

 this.actionService.updateActionByCreator(`Action/updateActionByCreator/${id}`, FormContainementAction).subscribe((result: Action)=>{
    this.toastr.info('Action Updated','Action Updated');
    this.getAllContainementActions();

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
    this.getAllContainementActions();

    this.toastr.success(`${ActionType} Of this Plan created`);
    if (!this.errorState) {
      this.form.resetForm();
    } else {
      this.form.reset();
    }

    // this.checkForm.markAsPristine();
    this.FormContainementActions.markAsUntouched();
  }, (error) => {
    console.error(error);
    this.toastr.warning(`${ActionType} Of this Plan Error`,error);
  });

}

// Delete

onDelete(_id: string) {
  let apiUrlforDelete = `Action/${_id}`;
  if (confirm('Are you sure to delete this record ?') == true) {
    this.actionService.deleteAction(apiUrlforDelete).subscribe((res) => {
      //this.refreshEmployeeList();
      //this.resetForm(form);
      this.toastr.error('Action deleted','Action deleted');
      this.getAllContainementActions();
      console.log('Default deleted');
    });
  }
}


redirectToDetailsAction(id: string) {

  const dialogRef = this.dialog.open(DetailsDialogComponent, {
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

}

export class CustomErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl, form: NgForm | FormGroupDirective | null) {
    return control && control.invalid && control.touched;
  }
}
