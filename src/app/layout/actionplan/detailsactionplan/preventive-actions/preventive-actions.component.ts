import { Component, OnInit, ViewChild } from '@angular/core';
import { Action } from 'src/app/models/Action';
import { ActivatedRoute } from '@angular/router';
import { ActionService } from 'src/app/services/action.service';
import { AnalysisGroupService } from 'src/app/services/analysis-group.service';

import {interval} from "rxjs/internal/observable/interval";

import { startWith, switchMap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, Validators, FormBuilder, NgForm, FormGroupDirective } from '@angular/forms';
import { ResponsableAction } from 'src/app/models/ResponsableAction';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog, ErrorStateMatcher } from '@angular/material';
import { User } from 'src/app/models/user.model';
import { DocumentStandarisation } from 'src/app/models/DocumentStandarisation';
import { DocumentStandarisationService } from 'src/app/services/document-standarisation.service';
import { DetailsDialogComponent } from '../containement-actions/dialogs/details-dialog/details-dialog.component';

@Component({
  selector: 'app-preventive-actions',
  templateUrl: './preventive-actions.component.html',
  styleUrls: ['./preventive-actions.component.scss']
})
export class PreventiveActionsComponent implements OnInit {
  public displayedColumns = ['Ref Action', 'Pos', 'Rsponsable Action', 'Document', 'Response At', 'Status', 'Details', 'update', 'delete'];

  public dataSource = new MatTableDataSource<Action>();

  @ViewChild('ActionsForm') form;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  idPlan: string;

  listUser: ResponsableAction[];
  listDocument: DocumentStandarisation[];
  selectedAction = new Action();
  public FormPreventiveAction: FormGroup;
  errorState = false;
  errorMatcher = new CustomErrorStateMatcher();
  constructor(private activeRoute: ActivatedRoute,
              private actionService: ActionService,
              private documentStandarisationService: DocumentStandarisationService,
              private analysisGroupeService: AnalysisGroupService,
              private toastr: ToastrService,
              public dialog: MatDialog, private formBuilder: FormBuilder
 ) {
  this.idPlan = this.activeRoute.snapshot.params.id;
 }

  ngOnInit() {
    this.FormPreventiveAction = new FormGroup({
      position: new FormControl('', [Validators.required]) ,
      responsableAction: new FormControl('', [Validators.required]) ,
      dateResponse: new FormControl('', [Validators.required]),
      Document:new FormControl('', [Validators.required])
    });
this.AllDocumentstandarisation();
this.getAllResponsableByGroupAnalyse();
this.getAllPreventiveActions();
this.resetObject();
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

  AllDocumentstandarisation() {
    this.documentStandarisationService.getAllDocumentStandaristion(`documentStandarisation/`).subscribe(result => {
      this.listDocument = result as DocumentStandarisation[];

      //this.listRootCause = result as RootCause[];
      console.log('Document de standarisation ......',result);
     // this.listUser = result as ResponsableAction[];
    });
  }

  getAllPreventiveActions(){
    const idPlan: string = this.activeRoute.snapshot.params.id;

    this.actionService.getActions(`Action/getActions/?idPlan=${idPlan}&ActionType=Preventive Actions`).subscribe(result => {
      this.dataSource.data = result as [];
      console.log("All Preventive Actions ..... ..... ",result);
    });
  }




  resetObject() {

    this.selectedAction = {
    _id: '',
    position: 0,
    description:'',
    responsableAction:new User(),
    dateResponse:  '',
    Document:new DocumentStandarisation()
      };
    }

    createPreventiveActions(FormPreventiveActions){
      const idPlan: string = this.activeRoute.snapshot.params.id;

      const correctiveAction:Action  = {

      refAction: "ACT" + Date.now(),
      position: FormPreventiveActions.position,
      status: "Non Attribué",
      description: FormPreventiveActions.description,
      responsableAction: FormPreventiveActions.responsableAction,
      dateResponse: FormPreventiveActions.dateResponse,
      Document:FormPreventiveActions.Document

      }


      if (this.selectedAction._id === '') {
        this.createAction(correctiveAction, 'Action/AddAction', idPlan, 'Preventive Actions');
      }else {
         this.updateAction(FormPreventiveActions,this.selectedAction._id,);
        }
    }


    updateAction(FormPreventiveActions,id : string){
      console.log(id);
      console.log(FormPreventiveActions);

     this.actionService.updateActionByCreator(`Action/updateActionByCreator/${id}`, FormPreventiveActions).subscribe((result: Action)=>{
        this.toastr.info('Preventive Action Updated','Preventive Action Updated');
        this.getAllPreventiveActions();

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
        this.getAllPreventiveActions();
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



    redirectToDetailsAction(id: string) {

      const dialogRef = this.dialog.open(DetailsDialogComponent, {
        data: {id: id}
      });

      dialogRef.afterClosed().subscribe(result => {

         // const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.id === this.id);
          // for delete we use splice in order to remove single object from DataService
          //his.exampleDatabase.dataChange.value.splice(foundIndex, 1);
         // this.refreshTable();
         this.getAllPreventiveActions();

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
     onDelete(_id: string) {
      let apiUrlforDelete = `Action/${_id}`;
       if (confirm('Are you sure to delete this record ?') == true) {
         this.actionService.deleteAction(apiUrlforDelete).subscribe((res) => {
           //this.refreshEmployeeList();
           //this.resetForm(form);
           this.toastr.error('Action deleted','Action deleted');
           this.getAllPreventiveActions();
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

