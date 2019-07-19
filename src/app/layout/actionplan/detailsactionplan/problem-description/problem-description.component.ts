import { Component, OnInit, ViewChild } from '@angular/core';
import { DescriptionService } from 'src/app/services/description.service';
import { ActivatedRoute } from '@angular/router';
import { ProblemDescription } from 'src/app/models/ProblemDescription';
import { MatDialog, MatTableDataSource, MatSort, MatPaginator, ErrorStateMatcher } from '@angular/material';
import { DetailDescriptionComponent } from './detail-description/detail-description.component';
import { FormGroup, FormBuilder, Validators, FormControl, NgForm, FormGroupDirective } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-problem-description',
  templateUrl: './problem-description.component.html',
  styleUrls: ['./problem-description.component.scss']
})
export class ProblemDescriptionComponent implements OnInit {

  public displayedColumns = ['Description', 'update', 'delete'];
  public dataSource = new MatTableDataSource<ProblemDescription>();
  @ViewChild('FormDescription') form;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public DescriptionForm: FormGroup;

  idPlan: string;
  selectedDescription= new ProblemDescription();
description : ProblemDescription;

errorState = false;
errorMatcher = new CustomErrorStateMatcher();
// tslint:disable-next-line: max-line-length
  constructor(private descriptionService:DescriptionService,private toastr: ToastrService,
    public dialog: MatDialog,private activeRoute: ActivatedRoute) { }

  ngOnInit() {

    this.DescriptionForm = new FormGroup({
      description: new FormControl('', [Validators.required])
    });


this.getDescriptionPlanByIdPlan();
this.resetObject();

  }

  resetObject() {

    this.selectedDescription = {
    _id: '',
   description:''
      };
    }


  getDescriptionPlanByIdPlan(){
    this.idPlan = this.activeRoute.snapshot.params.id;
    this.descriptionService.getdescriptionPlan(`problemdescription/getDescriptionByIdPlan/${this.idPlan}`).subscribe(result => {
      //this.listResponsable = result as User[];
      this.description = result[0] as ProblemDescription
      this.dataSource.data = result as [];

      console.log("Description Problem ...................",this.description);
      //this.listUser = result as ResponsableAction[];

    });
  }


  createDescriptionProblem(FormDescription){
    const idPlan: string = this.activeRoute.snapshot.params.id;

    const description:ProblemDescription  = {

    description: FormDescription.description,


    }


    if (this.selectedDescription._id === '') {
      this.createDescription(description, 'problemdescription/createdescription', idPlan);
    }else {
       this.updateDescription(FormDescription,this.selectedDescription._id,);
      }
  }

  updateDescription(FormDescription,id : string){
    console.log(id);
    console.log(FormDescription);

   this.descriptionService.updateDescription(`problemdescription/${id}`, FormDescription).subscribe((result: ProblemDescription)=>{
      this.toastr.info('Description Updated');
      this.getDescriptionPlanByIdPlan();

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
















  createDescription(description:ProblemDescription,route:string,idPlan : string){

    this.descriptionService.createDescription(`${route}/?idPlan=${idPlan}`, description)
    .subscribe((result) => {
      console.log(result);
      this.getDescriptionPlanByIdPlan();
      this.toastr.success(`${result} created`);
    }, (error) => {
      console.error(error);
      this.toastr.warning(`${error} Of this Plan Error`,error);
    });
    if (!this.errorState) {
      this.form.resetForm();
    } else {
      this.form.reset();
    }
    this.resetObject();
  }




















  onEdit(description: ProblemDescription) {
    this.selectedDescription = description;
    console.log(description);
  }

  onDelete(_id: string) {
    let apiUrlforDelete = `problemdescription/${_id}`;
    if (confirm('Are you sure to delete this record ?') == true) {
      this.descriptionService.deleteDescription(apiUrlforDelete).subscribe((res) => {
        //this.refreshEmployeeList();
        //this.resetForm(form);
        this.toastr.error('Description deleted','Description deleted');
        this.getDescriptionPlanByIdPlan();
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
