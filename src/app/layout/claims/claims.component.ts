import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ComplaintService } from './complaint.service';

@Component({
  selector: 'app-claims',
  templateUrl: './claims.component.html',
  styleUrls: ['./claims.component.scss']
})
export class ClaimsComponent implements OnInit {
//claimsForm
  public complaintForm: FormGroup;
  listCompanyType: {};
  listCompany: {};
  listProduit: {};
  listDefaut: {};
  constructor(private complaintService :ComplaintService) { }


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
/* image: new FormControl(null, {
  validators: [Validators.required],
  asyncValidators: [mimeType]
}) */
    });
  this.getAllDefaut();

    this.complaintService.getTypeCompany('typecompany/')
    .subscribe(result=>this.listCompanyType= result)
   // this.BindCompany('5cd618fab9462327c832d57c');
  }

/*   onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.complaintForm.patchValue({ image: file });
    this.complaintForm.get("image").updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result.toString();
      console.log(this.imagePreview);
    };
    reader.readAsDataURL(file);
  }
 */


  BindCompany(TypeCompanyId : string){
    this.complaintService.CompanyByTypeCompany(`company/getCompanyByTypeCompany/${TypeCompanyId}`)
    //http://localhost:3000/company/getCompanyByTypeCompany/
    .subscribe(resultlistCompany=>this.listCompany=resultlistCompany);

    //   return this.http.get(this.url + 'StateDetails/' + countryID).toPromise().then(result=>this.listState = result as State[])


   // this.service.StateByCountry(countryId);
 }

 BindProduct(CompanyId : string){

  this.complaintService.getByIdCompanyProduit(`produit/getByIdCompanyProduit/${CompanyId}`)
  //http://localhost:3000/company/getCompanyByTypeCompany/
  .subscribe(resultlistProduit=>this.listProduit=resultlistProduit);

  //   return this.http.get(this.url + 'StateDetails/' + countryID).toPromise().then(result=>this.listState = result as State[])


 // this.service.StateByCountry(countryId);
}


//listDefaut

getAllDefaut(){
  this.complaintService.getAllFault(`defaut/`).subscribe(result => this.listDefaut = result);
}

  createUser(){

  }

}
