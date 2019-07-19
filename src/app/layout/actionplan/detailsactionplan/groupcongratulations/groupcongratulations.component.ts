import { Component, OnInit, ViewChild } from '@angular/core';
import { GroupcongratulationsService } from 'src/app/services/groupcongratulations.service';
import { ActivatedRoute } from '@angular/router';
import { ActionPlan } from 'src/app/models/Action-Plan-model';
import { FormGroup, FormControl, Validators, FormBuilder, NgForm,FormGroupDirective } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProblemDescription } from 'src/app/models/ProblemDescription';
import { ErrorStateMatcher } from '@angular/material';

@Component({
  selector: 'app-groupcongratulations',
  templateUrl: './groupcongratulations.component.html',
  styleUrls: ['./groupcongratulations.component.scss']
})

export class GroupcongratulationsComponent implements OnInit {
  ActionPlan = new ActionPlan();
  public FormActionPlanStatus: FormGroup;
  @ViewChild('FormStatus') form;

  errorState = false;
  errorMatcher = new CustomErrorStateMatcher();

  constructor(private activeRoute: ActivatedRoute, private toastr: ToastrService,private groupcongratulationsService: GroupcongratulationsService) {

   }

  ngOnInit() {
    this.FormActionPlanStatus = new FormGroup({
      status:new FormControl('', [Validators.required])
    });


    this.getActionPlanStatus();
  }

  UpdateStatus(FormActionPlanStatus){

    const idPlan: string = this.activeRoute.snapshot.params.id;

   this.groupcongratulationsService.updateStatusActionPlan(`ActionPlan/updateActionStatus/${idPlan}`, FormActionPlanStatus).subscribe((result: ActionPlan)=>{
      this.toastr.info('Status Updated','Status Updated');
this.getActionPlanStatus();
if (!this.errorState) {
  this.form.resetForm();
} else {
  this.form.reset();
}
     // this.getAllcommande();
   /*   if (!this.errorState) {
      this.form.resetForm();
    } else {
      this.form.reset();
    }
    this.resetObject(); */



    },(error)=>{
     this.toastr.error('Error Updated','Error  Updated');

      console.error(error);
    });


  }

  getActionPlanStatus(){
    const idPlan: string = this.activeRoute.snapshot.params.id;


    this.groupcongratulationsService.getStatusActionPlan(`ActionPlan/${idPlan}`).subscribe(result => {
     // this.dataSource.data = result as Action[];
    this.ActionPlan = result as ActionPlan
      console.log("Status Action Plan ..... ",result);
    });
   }

}

export class CustomErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl, form: NgForm | FormGroupDirective | null) {
    return control && control.invalid && control.touched;
  }
}
