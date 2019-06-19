import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/login/auth.service';
import { User } from 'src/app/models/auth-data.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ActionPlanService } from 'src/app/services/action-plan.service';
import { ActionPlan } from 'src/app/models/Action-Plan-model';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-actionplan',
  templateUrl: './actionplan.component.html',
  styleUrls: ['./actionplan.component.scss']
})
export class ActionplanComponent implements OnInit {
  public displayedColumns = ['Ref Action Plan','Deadline', 'Details'];
  public dataSource = new MatTableDataSource<ActionPlan>();
  currentUser: User;
  teamLeaderId:string;

   @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private authService: AuthService,private actionPlanService:ActionPlanService,private activeRoute: ActivatedRoute ,private router: Router) { }

  ngOnInit() {
    this.currentUser = this.authService.currentUserValue;
    this.teamLeaderId = this.currentUser._id;
    console.log(this.teamLeaderId);
    this.getActionPlanByReceived(`ActionPlan/getAllActionPlanTeamLeader/${this.teamLeaderId}`);

  }

  private getActionPlanByReceived = (route : string)=>{
    //const id : string = this.activeRoute.snapshot.params.id;
    this.actionPlanService.getActionPlanByReceived(route).subscribe(res=>{
     this.dataSource.data = res as ActionPlan[];
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
