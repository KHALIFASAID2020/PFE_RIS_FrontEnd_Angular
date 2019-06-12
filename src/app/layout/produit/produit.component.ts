import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { ErrorStateMatcher, MatSlideToggleChange } from '@angular/material';
import {ToastrService} from 'ngx-toastr';
import { FormGroup, FormControl, Validators, FormBuilder, NgForm, FormGroupDirective } from '@angular/forms';


import { ProduitService } from './produit.service';
import { Produit } from './produit-model';


@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.scss']
})
export class ProduitComponent implements OnInit {


  public displayedColumns = ['Product Type', 'Product Ref', 'Designtation Product', 'update', 'delete'];
  public dataSource = new MatTableDataSource<Produit>();
  @ViewChild('ProduitForm') form;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  isLoading = false;

  selectedProduct: Produit;
  checkProduitForm: FormGroup;

    title = 'app';
    errorState = false;
    errorMatcher = new CustomErrorStateMatcher();

  constructor(private formBuilder: FormBuilder, private productService : ProduitService,private toastr: ToastrService) { }

  ///checkProduitForm
  ngOnInit() {



    this.productService.listAllProduct('produit/').subscribe(result=>{
      console.log(result)
      ////this.loading=false;
     this.dataSource.data = result as Produit[];

      //this.faults= faults;

    });


this.resetObject();
this.checkProduitForm  = this.formBuilder.group({
  'typeProduit': ['', Validators.required],
  'RefProduit': ['', Validators.required],
  'DesignationProduit': ['', Validators.required]
});
}




//Reset Object
resetObject(){
  this.selectedProduct = {
    _id: "",
    DesignationProduit: "",
    RefProduit: "",
    typeProduit: ""
  }
}


createProduct(formProduct: NgForm){


console.log(formProduct.value);
if (this.selectedProduct._id == "") {
  // console.log(this.selectedExport._id);
       this.productService.create('produit/AddProduit', formProduct.value)
       .subscribe((result: Produit)=>{
         this.toastr.success('Product  Created!','product Created!');
         this.resetObject();
         this.productService.listAllProduct('produit/').subscribe(result=>{
           console.log(result)
          this.dataSource.data = result as Produit[];
         });
       },(error)=>{
         console.error(error);
         this.toastr.warning(error,'error!');

       })

     }else{



       this.productService.update('produit/'+this.selectedProduct._id, formProduct.value).subscribe((result: Produit)=>{
         this.toastr.info('Produit Updated','Produit  Updated');

         this.resetObject();


         this.productService.listAllProduct('produit/').subscribe(result=>{
           console.log(result)
          this.dataSource.data = result as Produit[];

         });
       },(error)=>{
         console.error(error);
       });
      }








  if (!this.errorState) {
    this.form.resetForm();
  } else {
    this.form.reset();
  }

  // this.checkForm.markAsPristine();
  this.checkProduitForm.markAsUntouched();

}



// Delete
onDelete(_id: string, form: NgForm) {
  let apiUrlforDelete = `produit/${_id}`;
  if (confirm('Are you sure to delete this record ?') == true) {
    this.productService.delete(apiUrlforDelete).subscribe((res) => {
      //this.refreshEmployeeList();
      //this.resetForm(form);
      this.toastr.error('Fault deleted','Fault deleted');

      this.resetObject();


      console.log('Default deleted');


      this.productService.listAllProduct('produit/').subscribe(result=>{
        console.log(result)
        ////this.loading=false;
       this.dataSource.data = result as Produit[];

        //this.faults= faults;

      });

    });
  }
}




  onEdit(product: Produit) {
    this.selectedProduct = product;
    console.log(product);
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
