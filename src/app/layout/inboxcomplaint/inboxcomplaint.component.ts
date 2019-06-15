import { Component, OnInit, ViewChild } from '@angular/core';
import { ComplaintService } from '../claims/complaint.service';
import { AuthService } from 'src/app/login/auth.service';
import { User } from 'src/app/models/auth-data.model';
import { Complaint } from '../claims/complaint.model';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Router } from '@angular/router';
@Component({
  selector: 'app-inboxcomplaint',
  templateUrl: './inboxcomplaint.component.html',
  styleUrls: ['./inboxcomplaint.component.scss']
})
export class InboxcomplaintComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private complaintService: ComplaintService,private authService: AuthService,private router: Router) { }
  currentUser: User;
  creatorId : string;
  public displayedColumns = ['Ref Complaint', 'Complaint Type','company', 'Product', 'Quantity' ,'created At','details'];
  public dataSource = new MatTableDataSource<Complaint>();


  ngOnInit() {
    this.currentUser = this.authService.currentUserValue;
    this.creatorId = this.currentUser._id;
    console.log(this.creatorId);
    this.getAllReclamationReceived(`reclamation/getAllReclamationByDestination/${this.creatorId}`);
  }


  public getAllReclamationReceived = (route : string) => {
    this.complaintService.getAllReclamationByCreator(route)
    .subscribe(res => {
      this.dataSource.data = res as Complaint[];
      console.log(res);
    },
    (error) => {
      console.log(error);
    })
  }


  applyFilter(filterValue: string) {
  this.dataSource.filter = filterValue;
}

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }
  public redirectToDetails = (id: string) => {
    let url: string = `inboxcomplaint/detailsInboxComplaint/${id}`;
    this.router.navigate([url]);
    console.log(url);
  }

}
