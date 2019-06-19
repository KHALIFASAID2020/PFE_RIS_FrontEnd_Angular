import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/models/auth-data.model';
import { AuthService } from 'src/app/login/auth.service';
import { ActionService } from 'src/app/services/action.service';
import { Router } from '@angular/router';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { Action } from 'src/app/models/Action';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent implements OnInit {
  public displayedColumns = ['Ref Action','Deadline','Action', 'Details'];
  public dataSource = new MatTableDataSource<Action>();
  currentUser: User;
  responsableActionId:string;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private authService: AuthService,private actionService:ActionService, private router: Router) { }

  ngOnInit() {
    this.currentUser = this.authService.currentUserValue;
    this.responsableActionId = this.currentUser._id;
    console.log(this.responsableActionId);
    this.getActionReceived(`Action/getAllActionReceived/${this.responsableActionId}`);




  }
  private getActionReceived = (route : string)=>{
    //const id : string = this.activeRoute.snapshot.params.id;
    this.actionService.getActionReceived(route).subscribe(res=>{
      this.dataSource.data = res as Action[];
      console.log(this.dataSource.data)
       console.log(res);

    },(error)=>{
      console.log(error);
    })
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
 }


 applyFilter(filterValue: string) {
  this.dataSource.filter = filterValue;
}

redirectToDetailsPlanAction(id: string){
  let url: string = `actionplan/detailsplan/${id}`;
  this.router.navigate([url]);
console.log(id);
}
}



/*

*/
