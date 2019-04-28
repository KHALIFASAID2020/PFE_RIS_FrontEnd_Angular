import { HttpInterceptor } from '@angular/common/http';
import { AuthService } from './auth.service';
import {Injectable} from '@angular/core';

@Injectable()
export class JwtInterceptor implements HttpInterceptor{
  constructor(private authService: AuthService){

  }
  intercept(request: import("@angular/common/http").HttpRequest<any>, next: import("@angular/common/http").HttpHandler): import("rxjs").Observable<import("@angular/common/http").HttpEvent<any>> {
    let currentUser = this.authService.currentUserValue;
    if(currentUser && currentUser.token){
      request =request.clone({
    setHeaders :{
      Authorization: `Bearer ${currentUser.token}`
    }
      });
    }
    return next.handle(request);
  }

}
