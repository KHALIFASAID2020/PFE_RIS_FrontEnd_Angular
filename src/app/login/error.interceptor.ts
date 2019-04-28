import { HttpInterceptor } from '@angular/common/http';
import { AuthService } from './auth.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Injectable } from '@angular/core';
@Injectable()
export class ErrorInterceptor implements HttpInterceptor{
  constructor(private authService: AuthService){
  }

  intercept(request: import("@angular/common/http").HttpRequest<any>, next: import("@angular/common/http").HttpHandler): import("rxjs").Observable<import("@angular/common/http").HttpEvent<any>> {
  return next.handle(request).pipe(catchError(err => {
    if ([401,403].indexOf(err.status)!==-1){
      this.authService.logout();
      location.reload(true);
    }
const error=err.error.message || err.statusText;
return throwError(error);

  }))

}

}
