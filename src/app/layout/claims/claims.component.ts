import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ComplaintService } from './complaint.service';
import { CompanyType } from '../company/CompanyType-model';
import { Company } from '../company/iCompany';
import { Produit } from '../produit/produit-model';
import { fault } from '../catalogfaults/ifault';
import {FileUploadModule} from 'primeng/fileupload';


@Component({
  selector: 'app-claims',
  templateUrl: './claims.component.html',
  styleUrls: ['./claims.component.scss']
})
export class ClaimsComponent implements OnInit {
  uploadedFiles: any[] = [];

  public complaintForm: FormGroup;
  listCompanyType: CompanyType[];
  listCompany: Company[];
  listProduit: Produit[];
  listDefaut: fault[];
  constructor(private complaintService :ComplaintService) { }
  onUpload(event) {
    for(let file of event.files) {
        this.uploadedFiles.push(file);
        console.log(file);
      }


//    this.messageService.add({severity: 'info', summary: 'Success', detail: 'File Uploaded'});
}
/*  refReclamation:Joi.string().required(),
        typecompanyId:Joi.string().required(),
        produitId:Joi.string().required(),
        description:Joi.string().required(),
        daterep:Joi.string().required(),
        datelimit:Joi.string().required(),
        defautId:Joi.string().required(),
        companyId:Joi.string().required(),
        creatorId:Joi.string().required(),
        destinationId:Joi.string().required(),
        destinationencopy:Joi.string().required() */
  ngOnInit() {
     this.complaintForm = new FormGroup({
      refcomplaint: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      typecomplaint: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      product: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      Company: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      defautcomplaint: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      descriptioncomplaint:new FormControl('', [Validators.required, Validators.maxLength(60)]),
      dateOfResponse: new FormControl([Validators.required]),
      dateOfDeadline: new FormControl([Validators.required]),
      destinationcomplaint:new FormControl('', [Validators.required, Validators.maxLength(60)]),
      defautquantity:new FormControl('',[Validators.required]),
      image:new FormControl('',[Validators.required]),

    });
  this.getAllDefaut();

  this.complaintService.getTypeCompany('typecompany/')
    .subscribe(result=>this.listCompanyType= result)
  }



  BindCompany(TypeCompanyId : string){
    this.complaintService.CompanyByTypeCompany(`company/getByIdCompanyType/${TypeCompanyId}`)
    .subscribe(resultlistCompany=>this.listCompany=resultlistCompany);
 }

 BindProduct(CompanyId : string){
/*
  this.complaintService.getByIdCompanyProduit(`produit/getByIdCompanyProduit/${CompanyId}`)
  .subscribe(resultlistProduit=>this.listProduit=resultlistProduit); */
}


getAllDefaut(){
   this.complaintService.getAllFault(`defaut/`).subscribe(result => this.listDefaut = result as fault[]);
}

createclamis(){

  }

}
