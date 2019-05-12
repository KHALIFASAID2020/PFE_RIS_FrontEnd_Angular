import { Injectable } from '@angular/core';
import {User} from './user.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserManagerService {
selectedUser: User;
users: User[];
readonly baseURL= 'http://localhost:3000/users';
private baseUrlListCompany='http://localhost:3000/company'

  constructor(private http: HttpClient) { }

  RegisterUser(user: User){
    return this.http.post(this.baseURL + '/signup', user);
  }
/*
  getUserList(){
    return this.http.get(this.baseURL);
  }

 putUser(user:User,_id:string){
    return this.http.put(this.baseURL+`/${_id}`, user);
  }

  deleteEmployee(_id:string){
    return this.http.delete(this.baseURL+ `/${_id}`);
  } */

  getlistComany() {
  //return this.http.get(this.baseUrlListCompany + '/');
  //return this.http.get(`http://localhost:3000/users`);
  return this.http.get<any[]>(`http://localhost:3000/company`);


}
}
