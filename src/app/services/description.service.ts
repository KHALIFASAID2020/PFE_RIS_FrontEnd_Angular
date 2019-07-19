import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DescriptionService {

  constructor(private http: HttpClient) { }

  public createDescription (route: string, body) {
    return this.http.post(this.createCompleteRoute(route, environment.urlAddress), body,this.generateHeaders());
  }

  public updateDescription (route: string, body) {
    return this.http.put(this.createCompleteRoute(route, environment.urlAddress), body,this.generateHeaders());
  }

  public getdescriptionPlan(route: string) {
    return this.http.get(this.createCompleteRoute(route, environment.urlAddress));
   }

   public getdescriptionById(route: string) {
    return this.http.get(this.createCompleteRoute(route, environment.urlAddress));
   }

   public deleteDescription(route: string){
    return this.http.delete(this.createCompleteRoute(route, environment.urlAddress));
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
