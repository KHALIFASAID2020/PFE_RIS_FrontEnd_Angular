import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {UserManagerService} from './user-manager.service';
import {User} from './user.model';
import { first } from 'rxjs/operators';
/* export interface Company {
  value: string;
  viewValue: string;
} */

export interface Role{
  valueRole : string;
  viewValueRole :string;
}

@Component({
  selector: 'app-users-manager',
  templateUrl: './users-manager.component.html',
  styleUrls: ['./users-manager.component.scss']
})
export class UsersManagerComponent implements OnInit {

  roles: Role[] = [
    {valueRole: 'Admin', viewValueRole: 'Admin'},
    {valueRole: 'User', viewValueRole: 'User'}

  ];

  company: any[] = [];
  constructor(private usermanagerservice : UserManagerService) { }

  ngOnInit() {

    this.usermanagerservice.getlistComany().pipe(first()).subscribe(companys => {
      this.company = companys;
    console.log(this.company);
  });
    this.resetForm();
  }
  resetForm(form?: NgForm) {
    if (form)
      form.reset();
    this.usermanagerservice.selectedUser = {
      email: "",
      password: "",
      lastanme: "",
      firstname: "",
      companyId: "",
      poste: "",
      role: "",
      phone: "",
    }
  }
  onSaveUser(form: NgForm){
   // console.log(this.exampleForm.value.lastname);
   this.usermanagerservice.RegisterUser(form.value)
   .subscribe((res)=>{

   });

console.log(form.value);

  }

}
