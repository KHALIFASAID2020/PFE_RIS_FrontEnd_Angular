import { Component, OnInit, ViewChild } from '@angular/core';
import { AnalysisMethod } from 'src/app/models/AnalysisMethod';
import { RootCauseService } from 'src/app/services/root-cause.service';
import { RootCause } from 'src/app/models/RootCause';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, NgForm, FormGroupDirective, FormBuilder } from '@angular/forms';
import { ErrorStateMatcher, MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { ActionPlan } from 'src/app/models/Action-Plan-model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root-cause',
  templateUrl: './root-cause.component.html',
  styleUrls: ['./root-cause.component.scss']
})
export class RootCauseComponent implements OnInit {
  public displayedColumns = ['Cause','Analysis Method','Pourcent','update', 'delete'];
  public dataSource = new MatTableDataSource<RootCause>();


  @ViewChild('RootCauseForm') form;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  errorState = false;
  errorMatcher = new CustomErrorStateMatcher();
  public FormRootCause: FormGroup;
  idPlan: string;

  listMethod: AnalysisMethod[];
listRootCause : RootCause[];
  constructor(private formBuilder: FormBuilder,private toastr: ToastrService,private rootCauseService : RootCauseService,private activeRoute: ActivatedRoute) {
    this.idPlan = this.activeRoute.snapshot.params.id;
   }
  selectedCause = new RootCause();

  ngOnInit() {
    this.resetObject();
    this.AllAnalysisMethod();
    this.AllRootCause();

    this.FormRootCause  = this.formBuilder.group({
      rootCause: ['', Validators.required],
      analysisMethod: ['', Validators.required],
      pourcent: ['', Validators.required]
    });

  }

  createCause(FormCauseRout){
    const idPlan: string = this.activeRoute.snapshot.params.id;

    const rootCause:RootCause  = {

    rootCause :FormCauseRout.rootCause,
    analysisMethod:FormCauseRout.analysisMethod,
    pourcent:FormCauseRout.pourcent,

    }
    console.log(rootCause);

    if (this.selectedCause._id === '') {
   console.log(rootCause);
      this.createNewCause(rootCause, `cause/AddCause/${idPlan}` );
    }else {
    this.updateCause(rootCause,this.selectedCause._id,);
    }
  }




  updateCause(rooteCauseform,id : string){
    console.log(id);
    console.log(rooteCauseform);

   this.rootCauseService.updateCauseByActionPlanId(`cause/${id}`, rooteCauseform).subscribe((result: RootCause)=>{
      this.toastr.info('Cause Updated','Cause Updated');
      this.AllRootCause();

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


createNewCause(cause:RootCause,route:string){

  this.rootCauseService.createCause(route,cause)
  .subscribe((result) => {
    console.log(result);
    this.AllRootCause();

    this.toastr.success('Root Cause created');
    if (!this.errorState) {
      this.form.resetForm();
    } else {
      this.form.reset();
    }

    // this.checkForm.markAsPristine();
    this.FormRootCause.markAsUntouched();
  }, (error) => {
    console.error(error);
    this.toastr.warning('Insert Cause  Error',error);
  });

}
















AllAnalysisMethod() {
  //const id: string = this.activeRoute.snapshot.params.id;
  this.rootCauseService.getAllAnalysisMethod(`analysisMethod/`).subscribe(result => {
    this.listMethod = result as AnalysisMethod[];
    console.log('Aalysis Method',result);
   // this.listUser = result as ResponsableAction[];
  });
}

resetObject() {

  this.selectedCause = {
  _id: '',
  rootCause :'',
  analysisMethod:new AnalysisMethod(),
  pourcent:''    };
  }

AllRootCause() {
  const id: string = this.activeRoute.snapshot.params.id;
  this.rootCauseService.getAllRootCauseByActionPlan(`cause/getAllRootCauseByActionPlan/${id}`).subscribe(result => {
    this.dataSource.data = result as RootCause[];

    //this.listRootCause = result as RootCause[];
    console.log('Root Cause',result);
   // this.listUser = result as ResponsableAction[];
  });
}


onEdit(cause: RootCause) {
  this.selectedCause = cause;
  console.log(cause);
}
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
 }


 applyFilter(filterValue: string) {
  this.dataSource.filter = filterValue;
}

onDelete(_id: string) {
  let apiUrlforDelete = `cause/${_id}`;
  if (confirm('Are you sure to delete this record ?') == true) {
    this.rootCauseService.deleteCause(apiUrlforDelete).subscribe((res) => {
      //this.refreshEmployeeList();
      //this.resetForm(form);
      this.toastr.error('Cause deleted','Cause deleted');
      this.AllRootCause();
      console.log('Default deleted');
    });
  }
}


/*
  */

// Delete
/*
*/





























}


export class CustomErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl, form: NgForm | FormGroupDirective | null) {
    return control && control.invalid && control.touched;
  }
}
