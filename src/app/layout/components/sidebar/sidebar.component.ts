import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/login/auth.service';
import { User } from 'src/app/login/auth-data.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
currentUser: User;
email: string;
  public showMenu: string;
  constructor(private authService : AuthService) {
    this.authService.currentUser.subscribe(x => this.currentUser =x);
    const email = this.currentUser.email;
  }
  get isAdmin(){
    return this.currentUser && this.currentUser.role === 'Admin';
  }

  ngOnInit() {
      this.showMenu = '';
  }

  addExpandClass(element: any) {
    if (element === this.showMenu) {
        this.showMenu = '0';
    } else {
        this.showMenu = element;
    }
}
}
