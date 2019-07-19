import { Component, OnInit, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ComplaintService } from './complaint.service';
import { CompanyType } from '../../models/CompanyType-model';
import { Company } from '../../models/iCompany';
import { Produit } from '../../models/produit-model';
import { fault } from '../../models/ifault';
import {FileUploadModule} from 'primeng/fileupload';
import { User } from 'src/app/models/auth-data.model';

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
  constructor(private router : Router, private el: ElementRef,private complaintService :ComplaintService,private authService: AuthService, private toastr: ToastrService) {
    this.currentUser = this.authService.currentUserValue;
    this.creatorId = this.currentUser._id;
    console.log(this.creatorId);

  }


  ngOnInit() {
     this.complaintForm = new FormGroup({
      typecompany: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      company: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      produit: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      quantity:new FormControl('',[Validators.required]),
      defaut: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      description:new FormControl('', [Validators.required, Validators.maxLength(6000)]),
      daterep: new FormControl('',[Validators.required]),
      datelimit: new FormControl('',[Validators.required]),
      image:new FormControl('', [Validators.required]),
      destination:new FormControl('', [Validators.required]),
  });
    this.getAllUser();
  this.getAllDefaut();

  this.complaintService.getTypeCompany('typecompany/')
    .subscribe(result=>{
      this.listCompanyType= result
    })
  }
/* selectedFile:File =null;
  onImagePicked(event: Event) {

    this.selectedFile=(event.target as HTMLInputElement).files[0];

console.log(this.selectedFile);
  } */

  /* Upload() {
    //retrieve file upload HTML tag

    const fd=new FormData();
    fd.append('image',this.selectedFile,this.selectedFile.name);
    console.log(fd);

this.complaintService.uploadImageComplaint('reclamation/uploadImagesReclamation',fd)
.subscribe(res=>{
  console.log(res);
})

  } */







  upload() {
    //retrieve file upload HTML tag
    let inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#image');
    let fileCount: number = inputEl.files.length;
    let formData = new FormData();
    // make sure a file was selected.
    if (fileCount > 0) {
      //append the key name 'image' with the first file in the element
      formData.append('image', inputEl.files.item(0));
      console.log(inputEl.files.item(0));
      this.complaintService.uploadImageComplaint('reclamation/uploadImagesReclamation',formData).subscribe(data => console.log(data), error => console.error(error));
      };
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
  this.complaintService.getAllUser(`users/`).subscribe(result =>{
    this.listUser = result as User[];
 });
}

createclamis(complaintForm){

  console.log(complaintForm);
  console.log('Creator ID:',this.creatorId);
  //console.log(this.)


  const complaint: Complaint = {
    refReclamation: 'REC'+Date.now().toString(),
    typecompany: complaintForm.typecompany,
    produit: complaintForm.produit,
    description: complaintForm.description,
    daterep: complaintForm.daterep,
    datelimit: complaintForm.datelimit,
    defaut: complaintForm.defaut,
    company: complaintForm.company,
    creator: this.creatorId,
    destination: complaintForm.destination,
    quantity: complaintForm.quantity
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
