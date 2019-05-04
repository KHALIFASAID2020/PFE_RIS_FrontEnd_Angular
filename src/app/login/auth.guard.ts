import { Router,CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';


@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate{


  constructor(private router : Router,private authservice : AuthService){
    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
      const currentUser = this.authservice.currentUserValue;
      if(currentUser){
        if(route.data.roles && route.data.roles.indexOf(currentUser.role)===-1){
          this.router.navigate(['/']);
          return false;
        }
        return true;
      }
      this.router.navigate(['/login']);
      //,{queryParams: {returnUrl: state.url}}
      return false;
    }

}
