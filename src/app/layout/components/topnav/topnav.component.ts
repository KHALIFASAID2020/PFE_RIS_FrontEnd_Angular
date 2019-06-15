import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {Router} from '@angular/router';
import { AuthService } from 'src/app/login/auth.service';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/auth-data.model';
@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.scss']
})
export class TopnavComponent implements OnInit {
  private auhtListenerSubs: Subscription;

currentUser: User;
userFromApi : User;
email: string;
lastname:string;
firstname:string;

  constructor(private translate: TranslateService,private router: Router,private authService: AuthService) {
    this.currentUser = this.authService.currentUserValue;
    this.email = this.currentUser.email;
    this.lastname = this.currentUser.lastname;
    this.firstname = this.currentUser.firstname;


  }

  ngOnInit() {

  }


  changeLang(language: string) {

    this.translate.use(language);

}
onLoggedout(){
  this.authService.logout();
  this.router.navigate(['/login']);
}
}
