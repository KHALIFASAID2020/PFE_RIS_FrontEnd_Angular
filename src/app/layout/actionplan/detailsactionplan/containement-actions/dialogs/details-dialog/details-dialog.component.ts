import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Component, Inject, ViewChild} from '@angular/core';
import { ActionService } from 'src/app/services/action.service';
import { Action } from 'src/app/models/Action';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details-dialog',
  templateUrl: './details-dialog.component.html',
  styleUrls: ['./details-dialog.component.scss']
})
export class DetailsDialogComponent {
  public FormActionValidate: FormGroup;
  @ViewChild('ActionValidate') form;
action : Action

  constructor(public dialogRef: MatDialogRef<DetailsDialogComponent>,private activeRoute: ActivatedRoute,private actionService: ActionService,private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      console.log(data.id);
      this.actionService.getActionById(`Action/${data.id}`).subscribe(result => {
        // this.listContainementActions = result as Action[];
         //console.log("All Containement Actions ",this.listContainementActions);
        // this.dataSource.data = result as Action[];
   this.action = result as Action;
   console.log(this.action);
       });
     }

     getContainementActionsById(){
      //const idPlan: string = this.activeRoute.snapshot.params.id;


    }
    UpdateStatus(FormActionValidate){

    }

    onNoClick(): void {
      this.dialogRef.close();
    }

    confirmDelete(): void {
      //this.dataService.deleteIssue(this.data.id);
    }

    public onChange = (event) => {
            const Status  = {

              status: event.value

              }

              console.log(Status);

            this.actionService.updateStatusActionByCreator(`Action/updateStatusActionByCreator/${this.data.id}`,Status).subscribe((result: Action)=>{
               this.toastr.info('Status Updated','Status Updated');
        // this.getActionPlanStatus();


 },(error)=>{
  this.toastr.error('Error Updated','Error  Updated');

   console.error(error);
 });
    }

}
