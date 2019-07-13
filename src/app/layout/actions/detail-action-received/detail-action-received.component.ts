import { Component, OnInit } from '@angular/core';
import { Action } from 'src/app/models/Action';
import { ActionService } from 'src/app/services/action.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-detail-action-received',
  templateUrl: './detail-action-received.component.html',
  styleUrls: ['./detail-action-received.component.scss']
})
export class DetailActionReceivedComponent implements OnInit {
  action : Action;
 public ActionForm: FormGroup;

  constructor(private actionService:ActionService,private toastr: ToastrService,private router : Router,private activeRoute: ActivatedRoute) { }


  ngOnInit() {
    this.getActionDetails(this.activeRoute.snapshot.params.id);


    this.ActionForm = new FormGroup({
      status: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      responseDescription: new FormControl('', [Validators.maxLength(900)]),
        });
  }

  getActionDetails(id) {
    this.actionService.getActionById(`Action/${id}`)
      .subscribe(data => {
        console.log(data);
        this.action = data as Action;
console.log(data)
      });
  }


  onFormSubmit(ActionForm){
console.log(ActionForm);

this.actionService.updateActionByCreator(`Action/UpdateActionReceived/${this.activeRoute.snapshot.params.id}`, ActionForm).subscribe((result: Action)=>{
  this.toastr.success('Action Updated','Action Updated');
  //this.getAllPreventiveActions();
//actions
 /* // this.getAllcommande();
 if (!this.errorState) {
  this.form.resetForm();
} else {
  this.form.reset();
}
this.resetObject(); */
//private toastr: ToastrService,private router : Router

this.router.navigate(['../actions']);


console.log(result);
this.getActionDetails(this.activeRoute.snapshot.params.id);

},(error)=>{
 //this.toastr.error('Error Updated','Error  Updated');

  console.error(error);
});





  }


}
