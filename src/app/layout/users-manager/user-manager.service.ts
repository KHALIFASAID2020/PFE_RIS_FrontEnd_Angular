import { Injectable } from '@angular/core';
import {User} from '../../models/user.model';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from './../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserManagerService {
selectedUser: User;


  constructor(private http: HttpClient) { }

  private createCompleteRoute(route: string, envAddress: string) {
    return `${envAddress}/${route}`;
  }

  public getData(route: string) {
    return this.http.get(this.createCompleteRoute(route, environment.urlAddress));
  }

  public delete(route: string){
    return this.http.delete(this.createCompleteRoute(route, environment.urlAddress));
  }

public createUser (route: string, body) {
  return this.http.post(this.createCompleteRoute(route, environment.urlAddress), body);
}
getlistComany() {

  return this.http.get<any[]>(`http://localhost:3000/company`);


}

}
