import { Component, OnInit } from '@angular/core';
import { ComplaintService } from '../claims/complaint.service';
import { AuthService } from 'src/app/login/auth.service';
import { User } from 'src/app/login/auth-data.model';

@Component({
  selector: 'app-sentcomplaint',
  templateUrl: './sentcomplaint.component.html',
  styleUrls: ['./sentcomplaint.component.scss']
})
export class SentcomplaintComponent implements OnInit {

  constructor(private complaintService :ComplaintService,private authService: AuthService) { }
  currentUser: User;
  creatorId : string;

  ngOnInit() {
    this.currentUser = this.authService.currentUserValue;
    this.creatorId = this.currentUser._id;
    console.log(this.creatorId);

  }

}
