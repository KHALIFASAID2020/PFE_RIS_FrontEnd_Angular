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


  private createCompleteRoute(route: string, envAddress: string) {
    return `${envAddress}/${route}`;
  }
  private generateHeaders() {
    return {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
  }

}
