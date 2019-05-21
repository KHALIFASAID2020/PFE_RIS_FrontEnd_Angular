import { Component, OnInit , AfterViewInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {UserManagerService} from './user-manager.service';
import {User} from './user.model';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog } from '@angular/material';
import { UserModalComponent } from './user-modal/user-modal.component';

export interface Role{
  valueRole : string;
  viewValueRole :string;
}

@Component({
  selector: 'app-users-manager',
  templateUrl: './users-manager.component.html',
  styleUrls: ['./users-manager.component.scss']
})
export class UsersManagerComponent implements OnInit,AfterViewInit{
  public userForm: FormGroup;

  public dataSource = new MatTableDataSource<User>();
  public displayedColumns = ['Name', 'Company', 'Company type' , 'Poste', 'Email', 'Phone','Role','details', 'update', 'delete'];


  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  roles: Role[] = [
    {valueRole: 'Admin', viewValueRole: 'Admin'},
    {valueRole: 'User', viewValueRole: 'User'}

  ];
  users: any[] = [];
  company: any[] = [];

  isPopupOpened = true;

  constructor(private usermanagerservice : UserManagerService,private dialog?: MatDialog) { }

  ngOnInit() {


    this.getAllUsers();


  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
 }



 public doFilter = (value: string) => {
  this.dataSource.filter = value.trim().toLocaleLowerCase();
}

  public getAllUsers = () => {
    this.usermanagerservice.getData('users/')
    .subscribe(res => {
     this.dataSource.data = res as User[];
    console.log(res);

    },
    (error) => {
      //this.errorService.handleError(error);
      console.log(error);
    })
  }

/*   public redirectToDetails = (id: string) => {
    let url: string = `/owner/details/${id}`;
    this.router.navigate([url]);
  }

  public redirectToUpdate = (id: string) => {
    let url: string = `/owner/update/${id}`;
    this.router.navigate([url]);
  }

  public redirectToDelete = (id: string) => {
    let url: string = `users/delete/${id}`;
    this.router.navigate([url]);
  } */

  addContact() {
    this.isPopupOpened = true;
    const dialogRef = this.dialog.open(UserModalComponent, {
      height: '470px',
      width: '950px',
      disableClose: true,
      data: {}
    });


    dialogRef.afterClosed().subscribe(result => {
      this.isPopupOpened = false;
    });
  }



  public deleteOwner = (id: string) => {
    let deleteUrl: string = `users/${id}`;



    this.usermanagerservice.delete(deleteUrl)
      .subscribe(res => {

        console.log('User deleted');
      //  this.dialog.open(SuccessDialogComponent,this.dialogConfig);

       /*  dialogRef.afterClosed()
          .subscribe(result => {
            this.location.back();
          }); */
      },
      (error) => {
        //this.errorService.dialogConfig = this.dialogConfig;
      // this.errorService.handleError(error);
       console.log(error);
      })
  }


}
