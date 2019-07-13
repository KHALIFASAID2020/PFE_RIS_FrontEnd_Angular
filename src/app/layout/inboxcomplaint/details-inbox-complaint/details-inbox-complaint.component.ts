import { Component, OnInit, ViewChild } from '@angular/core';
import { ComplaintService } from '../../claims/complaint.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Complaint } from '../../claims/complaint.model';
import { AuthService } from 'src/app/login/auth.service';
import { FormGroup, FormControl, Validators, FormGroupDirective, NgForm, FormBuilder } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';
import { ActionPlanService } from 'src/app/services/action-plan.service';
import { ActionPlan } from '../../../models/Action-Plan-model';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-details-inbox-complaint',
  templateUrl: './details-inbox-complaint.component.html',
  styleUrls: ['./details-inbox-complaint.component.scss']
})
export class DetailsInboxComplaintComponent implements OnInit {
  @ViewChild('teamLeaderForm') form;
  public displayedColumns = ['Ref ActionPlan', 'Team Leader', 'Status', 'update', 'delete','Details'];
  public dataSource = new MatTableDataSource<ActionPlan>();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  public complaint: Complaint;
  listUser: User[];
  listActionPlan: ActionPlan[];

  public checkteamLeaderForm: FormGroup;
  errorState = false;
  selectedActionPlan: ActionPlan;

  errorMatcher = new CustomErrorStateMatcher();

// tslint:disable-next-line: max-line-length
  constructor(private complaintService: ComplaintService,private toastr: ToastrService, private actionPlanService : ActionPlanService , private router: Router,
              private activeRoute: ActivatedRoute, private authService: AuthService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getComplaintDetails();
    this.getAllUser();
    this.getActionPlanByComplaint();

    this.checkteamLeaderForm = this.formBuilder.group({
      teamLeader: ['', Validators.required],

   });
this.resetObject();
  }


//Reset Object
resetObject(){
  this.selectedActionPlan = {
    _id: "",
    RefActionPlan: "",
    reclamation: new Complaint(),
    teamLeader: new User(),
    status:"",
  }
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
      status: 'Non Cloturé'

    }
console.log(actionPlan);
    if (this.selectedActionPlan._id === '') {
      // console.log(this.selectedExport._id);

      this.actionPlanService.createActionPlan('ActionPlan/AddActionPlan',actionPlan).subscribe(result=>{
            console.log(result);
            this.getActionPlanByComplaint();

           this.toastr.success('Action Plan Affected !',`Action Plan Affected !`);
          //this.router.navigate(['../sentcomplaint']);

          }, (error) => {
           // this.toastr.error('Error Complaint!', 'Error Complaint !');
           console.log(error);

          });

         } else {
          console.log('Action Plan with id for Update',actionPlan);



           this.actionPlanService.updateActionPlanTeamLeaderAffect('ActionPlan/updateActionPlanTeamLeader/'+this.selectedActionPlan._id, actionPlan).subscribe((result: ActionPlan)=>{
            this.toastr.info('Team Leader  Updated','Team Leader  Updated');
            this.getActionPlanByComplaint();
            this.resetObject();



           },(error)=>{
            this.toastr.error('Error Updated','Error  Updated');

             console.error(error);
           });




          }




//console.log(teamLeaderForm);

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


onEdit(actionPlan: ActionPlan) {
  this.selectedActionPlan = actionPlan;
  console.log(actionPlan);
}



onDelete(_id: string, form: NgForm) {
  if (confirm('Are you sure to delete this Action Plan ?') == true) {
    this.actionPlanService.deleteActionPlan(`ActionPlan/${_id}`).subscribe((res) => {
      //this.refreshEmployeeList();
      //this.resetForm(form);
      this.toastr.error('Fault deleted','Fault deleted');

      this.resetObject();
      console.log('Default deleted');
      this.getActionPlanByComplaint();

    });
  }
}
public redirectToDetailsActionPlan = (id: string) => {
  let url: string = `actionplan/detailsplan/${id}`;
  this.router.navigate([url]);
  console.log(id);
}

}


  export class CustomErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl, form: NgForm | FormGroupDirective | null) {
      return control && control.invalid && control.touched;
    }
  }
