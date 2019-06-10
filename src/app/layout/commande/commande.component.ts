import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, NgForm, FormGroupDirective } from '@angular/forms';
import { CommandeService } from './commande.service';


import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { ErrorStateMatcher, MatSlideToggleChange } from '@angular/material';
import {ToastrService} from 'ngx-toastr';


import { Company } from '../company/iCompany';
import { Produit} from '../produit/produit-model';
import {Commande} from './Commande-model';

@Component({
  selector: 'app-commande',
  templateUrl: './commande.component.html',
  styleUrls: ['./commande.component.scss']
})
export class CommandeComponent implements OnInit {

  public displayedColumns = ['Product', 'Company', 'Quantity', 'date Delivery', 'update', 'delete'];
  public dataSource = new MatTableDataSource<Commande>();

  @ViewChild('CommandeForm') form;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  isLoading = false;
  errorState = false;
  errorMatcher = new CustomErrorStateMatcher();

  listcompany: {};
listProduit: {};
selectedCommande = new Commande();
checkCommandeForm: FormGroup;


  constructor(private formBuilder: FormBuilder, private commandeService: CommandeService, private toastr: ToastrService) { }

  ngOnInit() {
    this.resetObject();
    this.checkCommandeForm  = this.formBuilder.group({
      produitId: ['', Validators.required],
      companyId: ['', Validators.required],
      quantity: ['', Validators.required],
      dateDelivery: ['', Validators.required]
    });
    this.getAllcommande();
    this.commandeService.listAllProduit('produit/').subscribe(result => {
    this.listProduit = result;
    console.log(result);
  });

    this.commandeService.getAllCompany('company/').subscribe(result => {
    this.listcompany = result;
    console.log(result);
  });
}


  resetObject() {

    this.selectedCommande = {
       _id: '',
       dateDelivery: '',
       company: new Company(),
      produit: new Produit(),
      quantity: ''
    };
  }

getAllcommande() {
  this.commandeService.listAllCommande('commande/').subscribe(result => {
    console.log(result);
    this.dataSource.data=result as Commande[];
    console.log(this.dataSource.data);
  });
}
  createCommande(formCommande: NgForm) {
    if (this.selectedCommande._id === '') {
      // console.log(this.selectedExport._id);
           this.commandeService.create('commande/AddCommande', formCommande.value)
           .subscribe((result: Commande) => {
             console.log(result);
             this.toastr.success('commande of product Created!', 'Commande of product Created!');
             this.getAllcommande();
             this.resetObject();

           }, (error) => {
             console.error(error);
           });

         } else {



           this.commandeService.update('commande/'+this.selectedCommande._id, formCommande.value).subscribe((result: Commande)=>{
             this.toastr.info('Commande Updated','Commande  Updated');
             this.getAllcommande();
             this.resetObject();



           },(error)=>{
            this.toastr.error('Error Updated','Error  Updated');

             console.error(error);
           });



  }



    if (!this.errorState) {
      this.form.resetForm();
    } else {
      this.form.reset();
    }

    // this.checkForm.markAsPristine();
    this.checkCommandeForm.markAsUntouched();

  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
 }


  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }


  onDelete(_id: string, form: NgForm) {
    if (confirm('Are you sure to delete this record ?') == true) {
      this.commandeService.delete(`commande/${_id}`).subscribe((res) => {
        //this.refreshEmployeeList();
        //this.resetForm(form);
        this.toastr.error('Fault deleted','Fault deleted');

        this.resetObject();
        console.log('Default deleted');
      this.getAllcommande();

      });
    }
  }
  onEdit(productexport: Commande) {
    this.selectedCommande = productexport;
    console.log(productexport);
  }

}



export class CustomErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl, form: NgForm | FormGroupDirective | null) {
    return control && control.invalid && control.touched;
  }
}
