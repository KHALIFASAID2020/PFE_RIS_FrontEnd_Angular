import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
isLoading = false;
returnUrl : string;
error ='';
  constructor(private router: Router,private route : ActivatedRoute,public authService : AuthService) {

  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  onLogin(form : NgForm) {
  //  localStorage.setItem('isLoggedin', 'true');
  if(form.invalid){
    return;
  }
  console.log(form.value.email, form.value.password);

    this.authService.Login(form.value.email,form.value.password).pipe(first()).subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
       // console.log(data);
//C:\ProjetPFE\PFE-Node-Api-RIS
//https://stackblitz.com/edit/angular-reactive-form-sobsoft
        },error =>{
          this.error =error;
        }
      )
}
}
