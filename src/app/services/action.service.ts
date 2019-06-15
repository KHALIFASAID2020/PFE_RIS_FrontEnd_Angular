import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ActionService {


constructor(private http: HttpClient) { }

 public  getAllTypeAction(route: string) {
  return this.http.get(this.createCompleteRoute(route, environment.urlAddress));
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
