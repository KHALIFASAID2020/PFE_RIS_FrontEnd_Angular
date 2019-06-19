import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Component, Inject} from '@angular/core';
import { ActionService } from 'src/app/services/action.service';
import { Action } from 'src/app/models/Action';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss']
})
export class EditDialogComponent {
action : Action
  constructor(public dialogRef: MatDialogRef<EditDialogComponent>,private actionService: ActionService,
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
    editActionForm = new FormControl('', [
      Validators.required
      // Validators.email,
    ]);

    getErrorMessage() {
      return this.editActionForm.hasError('required') ? 'Required field' :
        this.editActionForm.hasError('email') ? 'Not a valid email' :
          '';
    }


    submit() {
      // emppty stuff
    }

    onNoClick(): void {
      this.dialogRef.close();
    }

    stopEdit(): void {
      //this.dataService.updateIssue(this.data);
    }

}
