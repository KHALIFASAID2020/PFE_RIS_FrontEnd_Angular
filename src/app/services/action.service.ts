import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {Action} from '../models/Action';
import { tap, catchError, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ActionService {
 /*  dataChange: BehaviorSubject<Action[]> = new BehaviorSubject<Action[]>([]);
  dialogData: any; */


constructor(private http: HttpClient) { }




 public  getAllTypeAction(route: string) {
  return this.http.get(this.createCompleteRoute(route, environment.urlAddress));
 }


 public  getActions(route: string) {
  return this.http.get(this.createCompleteRoute(route, environment.urlAddress));
 }

 public  getActionById(route: string) {
  return this.http.get(this.createCompleteRoute(route, environment.urlAddress));
 }

 public  getAllActionReceivedNotAttribue(route: string) {
  return this.http.get(this.createCompleteRoute(route, environment.urlAddress));
 }

//getActionReceived
/* public  getActionReceived(route: string) {
  return this.http.get(this.createCompleteRoute(route, environment.urlAddress));
 } */

 getActionReceived(route: string): Observable<any> {
  return this.http.get(this.createCompleteRoute(route, environment.urlAddress)).pipe(
    map(this.extractData),
    catchError(this.handleError));
}

public updateActionReceived(route: string, body){
  return this.http.put(this.createCompleteRoute(route, environment.urlAddress), body, this.generateHeaders());
}



public deleteAction(route: string){
  return this.http.delete(this.createCompleteRoute(route, environment.urlAddress));
}

private createCompleteRoute(route: string, envAddress: string) {
  return `${envAddress}/${route}`;
}

public updateActionByCreator(route: string, body){
  return this.http.put(this.createCompleteRoute(route, environment.urlAddress), body, this.generateHeaders());
}

public createAction (route: string, body) {
  return this.http.post(this.createCompleteRoute(route, environment.urlAddress), body,this.generateHeaders());
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
