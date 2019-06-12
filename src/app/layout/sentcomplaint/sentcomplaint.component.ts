import { Component, OnInit, ViewChild } from '@angular/core';
import { ComplaintService } from '../claims/complaint.service';
import { AuthService } from 'src/app/login/auth.service';
import { User } from 'src/app/login/auth-data.model';
import { Complaint } from '../claims/complaint.model';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sentcomplaint',
  templateUrl: './sentcomplaint.component.html',
  styleUrls: ['./sentcomplaint.component.scss']
})
export class SentcomplaintComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private complaintService :ComplaintService,private authService: AuthService,private router: Router) { }
  currentUser: User;
  creatorId : string;
  public displayedColumns = ['Ref Complaint', 'Complaint Type','company', 'Product', 'Quantity' ,'created At','details', 'update', 'delete'];

  public dataSource = new MatTableDataSource<Complaint>();

  ngOnInit() {
    this.currentUser = this.authService.currentUserValue;
    this.creatorId = this.currentUser._id;
    console.log(this.creatorId);
    this.getAllReclamationByCreator(`reclamation/getAllReclamationByCreator/${this.creatorId}`);

  }



  public getAllReclamationByCreator = (route : string) => {
    this.complaintService.getAllReclamationByCreator(route)
    .subscribe(res => {
      this.dataSource.data = res as Complaint[];
      console.log(res);
    },
    (error) => {
      console.log(error);
    })
  }


  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  public redirectToDetails = (id: string) => {
    let url: string = `/claims/details/${id}`;
    this.router.navigate([url]);
  }

  public redirectToUpdate = (id: string) => {
    let url: string = `/claims/update/${id}`;
    this.router.navigate([url]);
  }

  public redirectToDelete = (id: string) => {
    let url: string = `/claims/delete/${id}`;
    this.router.navigate([url]);
  }

}
