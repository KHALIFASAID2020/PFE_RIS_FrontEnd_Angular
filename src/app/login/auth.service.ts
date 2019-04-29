import { Injectable } from '@angular/core';
import {User} from './auth-data.model';
import {HttpClient} from '@angular/common/http';
import { tokenKey } from '@angular/core/src/view';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl: 'http://localhost:3000/users';
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>

  constructor(private http: HttpClient,private router: Router) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User{
    return this.currentUserSubject.value;
  }

  Login(email: string, password: string){

return this.http.post<any>(`http://localhost:3000/users/authenticate`, {email, password})
.pipe(map(user=>{
  if(user && user.token){
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
    console.log(localStorage);

  }

  return user;
}));
  }


  logout(){
  localStorage.removeItem('currentUser');
  this.currentUserSubject.next(null);
  }
}
