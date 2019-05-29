import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormControl, NgForm } from '@angular/forms';
import {FaultService} from './fault.service';
import {Ifault} from './ifault';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import {ToastrService} from 'ngx-toastr';


@Component({
  selector: 'app-catalogfaults',
  templateUrl: './catalogfaults.component.html',
  styleUrls: ['./catalogfaults.component.scss']
})
export class CatalogfaultsComponent implements OnInit {

  public displayedColumns = ['Code Defaut', 'French Fault', 'English Fault', 'Deautch Fault', 'update', 'delete'];
  public dataSource = new MatTableDataSource<Ifault>();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  isLoading = false;


  selectedFault: Ifault;

  public faultForm: NgForm;
  faults: Ifault[] = [];
  loading=true;
  constructor(private _faultservice : FaultService,private toastr: ToastrService) { }

  ngOnInit() {

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
      this.dataSource.data = faults as Ifault[];

      this.faults= faults;
    });
}

  onEdit(fault: Ifault) {
    this.selectedFault = fault;
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
 }


  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
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
    .subscribe((fault: Ifault)=>{
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
        this.dataSource.data = faults as Ifault[];

        this.faults= faults;
      });

      this.resetForm();
      console.log(res);
     // this.refreshEmployeeList();
    //  M.toast({ html: 'Updated successfully', classes: 'rounded' });
    });
  }
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
            this.dataSource.data = faults as Ifault[];

            this.faults= faults;
          });
          //M.toast({ html: 'Deleted successfully', classes: 'rounded' });
        });
      }
    }



}
