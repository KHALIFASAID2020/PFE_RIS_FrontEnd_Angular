import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpHeaders, HttpErrorResponse, HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GroupcongratulationsService {


  constructor(private http: HttpClient) { }

  getStatusActionPlan(route: string) {
   return this.http.get(this.createCompleteRoute(route, environment.urlAddress));
 }

 public updateStatusActionPlan(route: string, body){
   return this.http.put(this.createCompleteRoute(route, environment.urlAddress), body, this.generateHeaders());
 }


 private createCompleteRoute(route: string, envAddress: string) {
   return `${envAddress}/${route}`;
 }




 private generateHeaders() {
   return {
     headers: new HttpHeaders({'Content-Type': 'application/json'})
   }
 }



 private handleError(error: HttpErrorResponse) {
   if (error.error instanceof ErrorEvent) {
     // A client-side or network error occurred. Handle it accordingly.
     console.error('An error occurred:', error.error.message);
   } else {
     // The backend returned an unsuccessful response code.
     // The response body may contain clues as to what went wrong,
     console.error(
       `Backend returned code ${error.status}, ` +
       `body was: ${error.error}`);
   }
   // return an observable with a user-facing error message
   return throwError('Something bad happened; please try again later.');
 };

 private extractData(res: Response) {
   let body = res;
   return body || { };
 }
}
