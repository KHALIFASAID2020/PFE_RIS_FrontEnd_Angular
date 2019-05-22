import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ComplaintService } from './complaint.service';
export class TypeCompany {
  _id :string;
  type_company :string;
}
@Component({
  selector: 'app-claims',
  templateUrl: './claims.component.html',
  styleUrls: ['./claims.component.scss']
})
export class ClaimsComponent implements OnInit {
//claimsForm
  public complaintForm: FormGroup;
  listTypeCompany : TypeCompany[];

  constructor(private complaintService :ComplaintService) { }


  ngOnInit() {
     this.complaintForm = new FormGroup({
      refcomplaint: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      typecomplaint: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      product: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      company: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      defautcomplaint: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      descriptioncomplaint:new FormControl('', [Validators.required, Validators.maxLength(60)]),
      dateOfResponse: new FormControl([Validators.required]),
      dateOfDeadline: new FormControl([Validators.required]),
      destinationcomplaint:new FormControl('', [Validators.required, Validators.maxLength(60)]),
defautquantity:new FormControl('',[Validators.required])
    });

    this.complaintService.getTypeCompany('typecompany/').subscribe(result=>this.listTypeCompany = result as TypeCompany[])


  }

  createUser(){

  }

}
