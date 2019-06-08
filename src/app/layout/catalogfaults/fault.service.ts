import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { Observable } from 'rxjs/';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PusherService } from './pusher.service';
import { fault } from './ifault';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FaultService {
//private _endPoint = environment.urlAddress + '/defaut';
private _channel: any;
  constructor(private _http: HttpClient, private _pusherService: PusherService) {
    this._channel = this._pusherService.getPusher().subscribe('defaut');
   }

   getChannel() {
    return this._channel;
  }

 list(): Observable<fault[]> {
    return this._http.get(this.createCompleteRoute('defaut', environment.urlAddress)).pipe(
    map(res => res as fault[]));
  }

  create(route,body: fault) {
   // return this._http.post('http://localhost:3000/defaut/AddDefaut', param);
    return this._http.post(this.createCompleteRoute(route, environment.urlAddress), body, this.generateHeaders());
  }


 /*  delete(employee: IEmployee): Observable<IEmployee> {
    return this._http.delete(`${this._endPoint}/${employee.id}`)
    .mapTo(employee);
  }
 */
  public delete(route: string){
    return this._http.delete(this.createCompleteRoute(route, environment.urlAddress));
  }

/*
  public getData(route: string) {
    return this.http.get(this.createCompleteRoute(route, environment.urlAddress));
  }

  public create(route: string, body) {
    return this.http.post(this.createCompleteRoute(route, environment.urlAddress), body, this.generateHeaders());
  }

  public update(route: string, body){
    return this.http.put(this.createCompleteRoute(route, environment.urlAddress), body, this.generateHeaders());
  }

  public delete(route: string){
    return this.http.delete(this.createCompleteRoute(route, environment.urlAddress));
  }

 putEmployee(emp: Employee) {
    return this.http.put(this.baseURL + `/${emp._id}`, emp);
  }


  */

 public update(route: string, body){
  return this._http.put(this.createCompleteRoute(route, environment.urlAddress), body, this.generateHeaders());
}

  private createCompleteRoute(route: string, envAddress: string) {
    return `${envAddress}/${route}`;
  }

  private generateHeaders() {
    return {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
  }


}
