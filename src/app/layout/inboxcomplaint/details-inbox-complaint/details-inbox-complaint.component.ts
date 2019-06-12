import { Component, OnInit, ViewChild } from '@angular/core';
import { ComplaintService } from '../../claims/complaint.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Complaint } from '../../claims/complaint.model';
import { User } from 'src/app/login/auth-data.model';
import { AuthService } from 'src/app/login/auth.service';
import { FormGroup, FormControl, Validators, FormGroupDirective, NgForm, FormBuilder } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';
import { ActionPlanService } from 'src/app/services/action-plan.service';
import { ActionPlan } from '../../actionplan/Action-Plan-model';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-details-inbox-complaint',
  templateUrl: './details-inbox-complaint.component.html',
  styleUrls: ['./details-inbox-complaint.component.scss']
})
export class DetailsInboxComplaintComponent implements OnInit {
  @ViewChild('teamLeaderForm') form;
  public displayedColumns = ['Ref ActionPlan', 'Team Leader', 'Status', 'update', 'delete'];
  public dataSource = new MatTableDataSource<ActionPlan>();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  public complaint: Complaint;
  listUser: User[];
  listActionPlan: ActionPlan[];

  public teamLeaderForm: FormGroup;
  errorState = false;
  errorMatcher = new CustomErrorStateMatcher();

// tslint:disable-next-line: max-line-length
  constructor(private complaintService: ComplaintService,private toastr: ToastrService, private actionPlanService : ActionPlanService , private router: Router,
              private activeRoute: ActivatedRoute, private authService: AuthService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getComplaintDetails();
    this.getAllUser();
    this.getActionPlanByComplaint();

    this.teamLeaderForm = this.formBuilder.group({
      teamLeader: ['', Validators.required],

   });

  }
  getAllUser() {
    this.complaintService.getAllUser(`users/`).subscribe(result => {
      this.listUser = result as User[];
   });
  }

  sendRecToTeamLeader(teamLeaderForm) {

const actionPlan : ActionPlan={
  RefActionPlan: 'Plan'+Date.now(),
  reclamation:  this.activeRoute.snapshot.params.id,
  teamLeader: teamLeaderForm.teamLeader,
  status: 'Non Atribué'

}


    console.log('Action Plan ',actionPlan);

this.complaintService.createComplaint('ActionPlan/AddActionPlan',actionPlan).subscribe(result=>{
      console.log(result);
      this.getActionPlanByComplaint();

     this.toastr.success('Action Plan Affected !',`Action Plan Affected !`);
    //this.router.navigate(['../sentcomplaint']);

    }, (error) => {
     // this.toastr.error('Error Complaint!', 'Error Complaint !');
     console.log(error);

    });


console.log(teamLeaderForm);

  }

  private getComplaintDetails = () => {
    const id: string = this.activeRoute.snapshot.params.id;
   // let apiUrl: string = `api/owner/${id}/account`;

    this.complaintService.getReclamationReceivedDetails(`reclamation/${id}`)
    .subscribe(res => {
      this.complaint = res as Complaint;
      console.log(res);
    },
    (error) => {
     console.log(error);
    });
  }

private getActionPlanByComplaint = ()=>{
  const id : string = this.activeRoute.snapshot.params.id;
  this.actionPlanService.getActionPlanByComplaint(`ActionPlan/getActionPlanByComplaint/${id}`).subscribe(res=>{
    this.dataSource.data = res as ActionPlan[];
    console.log(res);
  },(error)=>{
    console.log(error);
  })
}


applyFilter(filterValue: string) {
  this.dataSource.filter = filterValue;
}


public redirectToUpdate = (id: string) => {
  let url: string = `/inboxcomplaint/updateAffectedActionPlan/${id}`;
  this.router.navigate([url]);
}

}


  export class CustomErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl, form: NgForm | FormGroupDirective | null) {
      return control && control.invalid && control.touched;
    }
  }
