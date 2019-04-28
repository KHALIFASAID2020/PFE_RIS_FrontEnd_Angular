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
/*   private token: string;
private authStatusListener =new Subject<boolean>();
private isAuthenticated = false; */
  constructor(private http: HttpClient,private router: Router) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User{
    return this.currentUserSubject.value;
  }

  /* getToken(){
    return this.token;
  }
  getIsAuth(){
    return this.isAuthenticated;
  }

getAuthStatusListener(){
return this.authStatusListener.asObservable();
} */

  Login(email: string, password: string){
    /* const authData: AuthData = {email: email,password: password};
    this.http.post<{token: string}>("http://localhost:3000/api/users/login",authData).subscribe(response =>{
      //console.log(response);
      const token = response.token;
      this.token = token;
      if(token){
        this.isAuthenticated = true;
        this.authStatusListener.next(true);
        this.router.navigate(['/']);
        console.log(this.token);
      }
       }); */

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
    /* this.token = null;
    this.isAuthenticated =false;
    this.authStatusListener.next(false);

    this.router.navigate(['/']); */
  localStorage.removeItem('currentUser');
  this.currentUserSubject.next(null);
  }
}
