import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ComplaintService } from './complaint.service';
import { CompanyType } from '../company/CompanyType-model';
import { Company } from '../company/iCompany';
import { Produit } from '../produit/produit-model';
import { fault } from '../catalogfaults/ifault';
import {FileUploadModule} from 'primeng/fileupload';
import { User } from 'src/app/login/auth-data.model';

import { AuthService } from 'src/app/login/auth.service';
import { Complaint } from './complaint.model';
import {ToastrService} from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-claims',
  templateUrl: './claims.component.html',
  styleUrls: ['./claims.component.scss']
})
export class ClaimsComponent implements OnInit {
  uploadedFiles: any[] = [];

  public complaintForm: FormGroup;
  listCompanyType: CompanyType;
  listCompany: Company;
  listProduit: Produit;
  listUser : User[];
  currentUser: User;
  listDefaut: fault[];
  creatorId : string;
  constructor(private router : Router,private complaintService :ComplaintService,private authService: AuthService, private toastr: ToastrService) {
    this.currentUser = this.authService.currentUserValue;
    this.creatorId = this.currentUser._id;
    console.log(this.creatorId);

  }
  onUpload(event) {
    for(const file of event.files) {
        this.uploadedFiles.push(file);
        console.log(file);
      }
}

  ngOnInit() {
     this.complaintForm = new FormGroup({
      typecompanyId: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      companyId: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      produitId: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      quantity:new FormControl('',[Validators.required]),
      defautId: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      description:new FormControl('', [Validators.required, Validators.maxLength(6000)]),
      daterep: new FormControl('',[Validators.required]),
      datelimit: new FormControl('',[Validators.required]),
      destinationId:new FormControl('', [Validators.required]),
      destinationencopy:new FormControl('', [Validators.required])



 /*
 refReclamation: string;
 creatorId: string;

  typecompanyId: string;
  produitId: string;
  description: string;
  daterep: string;
  datelimit: string;
  defautId: string;
  companyId: string;
  creatorId: string;
  destinationId:string;
  destinationencopy:string;
  quantity:number; */




     /*  product: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      defautcomplaint: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      descriptioncomplaint:new FormControl('', [Validators.required, Validators.maxLength(6000)]),
      dateOfResponse: new FormControl([Validators.required]),
      dateOfDeadline: new FormControl([Validators.required]),
      destinationcomplaint:new FormControl('', [Validators.required, Validators.maxLength(60)]),
      */
     // image:new FormControl('',[Validators.required]),

    });
    this.getAllUser();
  this.getAllDefaut();

  this.complaintService.getTypeCompany('typecompany/')
    .subscribe(result=>{
      this.listCompanyType= result
    })
  }



  BindCompany(TypeCompanyId : string){
   this.complaintService.CompanyByTypeCompany(`company/getByIdCompanyType/${TypeCompanyId}`)
    .subscribe(resultlistCompany=>this.listCompany=resultlistCompany as Company);
 }

BindProduct(CompanyId : string){

if (CompanyId === '5cdf2da45f147c0a848eafac'){
  this.complaintService.getCompanyProduit(`commande/`)
  .subscribe(resultlistProduit=>this.listProduit=resultlistProduit as Produit);
  console.log(this.listProduit);
}else{
  this.complaintService.getByIdCompanyProduit(`commande/getByIdCompanyProduit/${CompanyId}`)
  .subscribe(resultlistProduit=>this.listProduit=resultlistProduit as Produit);
  console.log(this.listProduit);

}}


getAllDefaut(){
   this.complaintService.getAllFault(`defaut/`).subscribe(result => this.listDefaut = result as fault[]);
}

getAllUser(){
  this.complaintService.getAllFault(`users/`).subscribe(result =>{
    this.listUser = result as User[];
 });
}

createclamis(complaintForm){

  console.log(complaintForm);
console.log('Creator ID:',this.creatorId);
  //console.log(this.)


  const complaint: Complaint = {
    refReclamation: 'REC'+Date.now(),
    typecompanyId: complaintForm.typecompanyId,
    produitId: complaintForm.produitId,
    description: complaintForm.description,
    daterep: complaintForm.daterep,
    datelimit: complaintForm.datelimit,
    defautId: complaintForm.defautId,
    companyId: complaintForm.companyId,
    creatorId: this.creatorId,
    destinationId:complaintForm.destinationId,
    destinationencopy:complaintForm.destinationencopy,
    quantity:complaintForm.quantity
  }
console.log('Complaint',complaint);

this.complaintService.createComplaint('reclamation/AddReclamation',complaint).subscribe(result=>{
  this.toastr.success('Complaint Created!', 'Complaint Created!');
this.router.navigate(['../sentcomplaint']);

}, (error) => {
  this.toastr.error('Error Complaint!', 'Error Complaint !');

});




  }

}
