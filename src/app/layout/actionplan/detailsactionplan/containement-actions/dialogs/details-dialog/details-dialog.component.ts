import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Component, Inject} from '@angular/core';
import { ActionService } from 'src/app/services/action.service';
import { Action } from 'src/app/models/Action';

@Component({
  selector: 'app-details-dialog',
  templateUrl: './details-dialog.component.html',
  styleUrls: ['./details-dialog.component.scss']
})
export class DetailsDialogComponent {
action : Action
  constructor(public dialogRef: MatDialogRef<DetailsDialogComponent>,private actionService: ActionService,
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


    onNoClick(): void {
      this.dialogRef.close();
    }

    confirmDelete(): void {
      //this.dataService.deleteIssue(this.data.id);
    }

}
