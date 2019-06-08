import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, NgForm, FormGroupDirective } from '@angular/forms';
import { ExportService } from './export.service';
import { Export } from './Export-model';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { ErrorStateMatcher, MatSlideToggleChange } from '@angular/material';
import {ToastrService} from 'ngx-toastr';

import { Company } from '../company/iCompany';
import { Produit} from '../produit/produit-model';


@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.scss']
})
export class ExportComponent implements OnInit {

  public displayedColumns = ['Product', 'Company', 'Quantity', 'Export of Date', 'update', 'delete'];
  public dataSource = new MatTableDataSource<Export>();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  isLoading = false;

listcompany:{};
listProduit: {};
selectedExport: Export;
checkExportForm: FormGroup;

  title = 'app';
  errorState = false;
  errorMatcher = new CustomErrorStateMatcher();
  @ViewChild('ExportForm') form;
  constructor(private formBuilder: FormBuilder, private exportService : ExportService,private toastr: ToastrService) { }

  ngOnInit() {


this.exportService.getAllCompany('company/getAllCompanyClient').subscribe(result=>this.listcompany=result);

this.exportService.getAllProduct('produit/getProduitByType').subscribe(result =>this.listProduit=result);



this.exportService.listAllExport('ExportProduitFini/').subscribe(result=>{
  console.log(result)
  ////this.loading=false;
 this.dataSource.data = result as Export[];

  //this.faults= faults;

});
this.resetObject();

this.checkExportForm  = this.formBuilder.group({
  'produitId': ['', Validators.required],
  'companyId': ['', Validators.required],
  'quantity': ['', Validators.required],
  'dateExport': ['', Validators.required]
});

  }
  resetObject(){

    this.selectedExport = {
      _id: "",
      dateExport: "",
      quantity:  "",
      company: new Company(),
      produit:new Produit()
    }
  }

  createExport(formExport: NgForm) {

    //console.log(formExport.value);

    if (this.selectedExport._id == "") {
     // console.log(this.selectedExport._id);
          this.exportService.create('ExportProduitFini/AddExport', formExport.value)
          .subscribe((result: Export)=>{
            this.toastr.success('Export of product Created!','Export of product Created!');
            this.resetObject();


            this.exportService.listAllExport('ExportProduitFini/').subscribe(result=>{
              console.log(result)
             this.dataSource.data = result as Export[];
            });
          },(error)=>{
            console.error(error);
          })

        }else{



          this.exportService.update('ExportProduitFini/'+this.selectedExport._id, formExport.value).subscribe((result: Export)=>{
            this.toastr.info('Export Updated','Export  Updated');

            this.resetObject();


            this.exportService.listAllExport('ExportProduitFini/').subscribe(result=>{
              console.log(result)
             this.dataSource.data = result as Export[];

            });
          },(error)=>{
            console.error(error);
          });

         /*  this.exportService.update('ExportProduitFini/'+this.selectedExport._id, formExport.value).subscribe((res) => {

            this.toastr.info('Export Updated','Export  Updated'); */

/* this.exportService.listAllExport('ExportProduitFini/').subscribe(result=>{
  console.log(result)
 this.dataSource.data = result as IExport[];

}) */}






    if (!this.errorState) {
      this.form.resetForm();
    } else {
      this.form.reset();
    }

    // this.checkForm.markAsPristine();
    this.checkExportForm.markAsUntouched();
  }




  onDelete(_id: string, form: NgForm) {
    let apiUrlforDelete = `ExportProduitFini/${_id}`;
    if (confirm('Are you sure to delete this record ?') == true) {
      this.exportService.delete(apiUrlforDelete).subscribe((res) => {
        //this.refreshEmployeeList();
        //this.resetForm(form);
        this.toastr.error('Fault deleted','Fault deleted');

        this.resetObject();


        console.log('Default deleted');


        this.exportService.listAllExport('ExportProduitFini/').subscribe(result=>{
          console.log(result)
          ////this.loading=false;
         this.dataSource.data = result as Export[];

          //this.faults= faults;

        });

      });
    }
  }
  onEdit(productexport: Export) {
    this.selectedExport = productexport;
    console.log(productexport);
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
 }


  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }
}

export class CustomErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl, form: NgForm | FormGroupDirective | null) {
    return control && control.invalid && control.touched;
  }
}
