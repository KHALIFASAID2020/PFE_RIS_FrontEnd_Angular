import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ResponsableAction } from '../models/ResponsableAction';
import { catchError, map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AnalysisGroupService {

  constructor(private http: HttpClient) { }

  public createAnalysisGroup (route: string, body) {
    return this.http.post(this.createCompleteRoute(route, environment.urlAddress), body,this.generateHeaders());
  }
//get Aanlysisi Group

  public getAnalysisGroupByActionPlan(route : string){

    return this.http.get(this.createCompleteRoute(route, environment.urlAddress)) ;
  }
  public create (route: string, body) {
    return this.http.post(this.createCompleteRoute(route, environment.urlAddress), body,this.generateHeaders());
  }
  private createCompleteRoute(route: string, envAddress: string) {
    return `${envAddress}/${route}`;
  }

  public getAllResponsableAction(route : string){
    return this.http.get(this.createCompleteRoute(route, environment.urlAddress)) ;
  }
  public getAllResponsableByGroupAnalyse(route : string){
    return this.http.get(this.createCompleteRoute(route, environment.urlAddress)) ;
  }


  private generateHeaders() {
    return {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
  }





/** Log a HeroService message with the MessageService */

}



