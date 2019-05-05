import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
@Component({
  selector: 'app-users-manager',
  templateUrl: './users-manager.component.html',
  styleUrls: ['./users-manager.component.scss']
})
export class UsersManagerComponent implements OnInit {
  exampleForm: FormGroup;


  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    //https://stackblitz.com/edit/angular-reactive-form-sobsoft?file=app%2Fapp.component.html
    this.exampleForm = this.formBuilder.group({
      companyName: ['', [Validators.required,Validators.maxLength(25)]],
      countryName: [''],
      city: [''],
      zipCode: [''],
      street: ['']
    });
  }

}
