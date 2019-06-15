import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormControl, NgForm, FormGroupDirective, FormBuilder } from '@angular/forms';
import {FaultService} from './fault.service';
import { fault} from '../../models/ifault';
import { MatTableDataSource, MatSort, MatPaginator, ErrorStateMatcher } from '@angular/material';
import {ToastrService} from 'ngx-toastr';


@Component({
  selector: 'app-catalogfaults',
  templateUrl: './catalogfaults.component.html',
  styleUrls: ['./catalogfaults.component.scss']
})
export class CatalogfaultsComponent implements OnInit {

  public displayedColumns = ['Code Defaut', 'French Fault', 'English Fault', 'Deautch Fault', 'update', 'delete'];
  public dataSource = new MatTableDataSource<fault>();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('faultForm') form;
  errorState = false;
  errorMatcher = new CustomErrorStateMatcher();
  isLoading = false;

  checkFaultForm: FormGroup;

  selectedFault: fault;

  public faultForm: NgForm;
  faults: fault[] = [];
  loading=true;
  constructor(private _faultservice : FaultService,private formBuilder: FormBuilder,private toastr: ToastrService) { }

  ngOnInit() {

    this.checkFaultForm  = this.formBuilder.group({
      'codeDefaut': ['', Validators.required],
      'DesignationDefautEn': ['', Validators.required],
      'DesignationDefautDe': ['', Validators.required],
      'DesignationDefautFr': ['', Validators.required]
    });

   this.selectedFault = {
      _id:"",
      codeDefaut: "",
      DesignationDefautEn: "",
      DesignationDefautDe: "",
      DesignationDefautFr: ""
    }


    this.loading = true;
    this._faultservice.getChannel().bind('new', data => {
      data.new = true;
      this.faults.push(data);
      this.dataSource.data=this.faults;
    });



    this._faultservice.list().subscribe(faults=>{
      console.log(faults)
      this.loading=false;
      this.dataSource.data = faults;

      this.faults= faults;
    });
}

  onEdit(fault: fault) {
    this.selectedFault = fault;
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
 }


 applyFilter(filterValue: string) {
  this.dataSource.filter = filterValue;
}


   resetForm() {
    this.selectedFault = {
      _id:"",
      codeDefaut: "",
      DesignationDefautEn: "",
      DesignationDefautDe: "",
      DesignationDefautFr: ""
    }
    console.log(this.selectedFault);

   /*  if (form)
      form.reset();
    this.selectedFault = {
      _id:"",
      codeDefaut: "",
      DesignationDefautEn: "",
      DesignationDefautDe: "",
      DesignationDefautFr: ""
    } */
  }
  loader: boolean;

  public createfault(faultForm: NgForm) {
    let apiUrl = 'defaut/AddDefaut';


    console.log(faultForm.value);
    if (this.selectedFault._id == "") {
console.log(this.selectedFault._id);
    this._faultservice.create(apiUrl, faultForm.value)
    .subscribe((fault: fault)=>{
      this.toastr.success('Fault Created!', 'Fault Created!');

      this.isLoading = false;
      this.loader = false;
    this.resetForm();




     console.log(fault)
    },(error)=>{
      this.toastr.warning('Fault Not Created',error);

      console.error(error);
      this.loader=false;
    })
  }else{
    console.log(this.selectedFault._id);
    //console.log(this.faultForm.value.id);
    // tslint:disable-next-line:no-unused-expression
  let apiUrlUpdateDefault = `defaut/${this.selectedFault._id}`;
    this._faultservice.update(apiUrlUpdateDefault, faultForm.value).subscribe((res) => {

      this.toastr.info('Fault  Updated','Fault  Updated');



      this._faultservice.list().subscribe(faults=>{

        console.log(faults)
        this.loading=false;
        this.dataSource.data = faults as fault[];

        this.faults= faults;
      });

      this.resetForm();
      console.log(res);
     // this.refreshEmployeeList();
    //  M.toast({ html: 'Updated successfully', classes: 'rounded' });
    });
  }



  if (!this.errorState) {
    this.form.resetForm();
  } else {
    this.form.reset();
  }

  // this.checkForm.markAsPristine();
  this.checkFaultForm.markAsUntouched();

    }


    onDelete(_id: string, form: NgForm) {
      let apiUrlforDelete = `defaut/${_id}`;
      if (confirm('Are you sure to delete this record ?') == true) {
        this._faultservice.delete(apiUrlforDelete).subscribe((res) => {
          //this.refreshEmployeeList();
          //this.resetForm(form);
          this.toastr.error('Fault deleted','Fault deleted');

          console.log('Default deleted');

          this._faultservice.list().subscribe(faults=>{
            console.log(faults)
            this.loading=false;
            this.dataSource.data = faults as fault[];

            this.faults= faults;
          });
          //M.toast({ html: 'Deleted successfully', classes: 'rounded' });
        });
      }
    }



}

export class CustomErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl, form: NgForm | FormGroupDirective | null) {
    return control && control.invalid && control.touched;
  }
}
