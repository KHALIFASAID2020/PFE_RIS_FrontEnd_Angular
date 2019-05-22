import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserManagerService } from '../user-manager.service';
import { User } from '../user.model';
import { Location } from '@angular/common';
import { first } from 'rxjs/operators';

/*import { SuccessDialogComponent } from '../../shared/dialogs/success-dialog/success-dialog.component';
import { ErrorHandlerService } from '../../shared/error-handler.service'; */
export interface Role{
  valueRole : string;
  viewValueRole :string;
}

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.scss']
})


export class UserModalComponent implements OnInit {
  company: any[] = [];
  roles: Role[] = [
    {valueRole: 'Admin', viewValueRole: 'Admin'},
    {valueRole: 'User', viewValueRole: 'User'}

  ];

  public userForm: FormGroup;
 // private dialogConfig;
  constructor(  private location: Location,
    private dialogRef: MatDialogRef<UserModalComponent>,@Inject(MAT_DIALOG_DATA) public data: any,private usermanagerservice: UserManagerService) { }

  onNoClick(): void {
    this.dialogRef.close();
   }

  ngOnInit() {




    this.userForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      password: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      lastname: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      firstname: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      companyId: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      poste: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      role: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      phone:new FormControl('', [Validators.required, Validators.maxLength(60)])
    });

    this.usermanagerservice.getlistComany().pipe(first()).subscribe(companys => {
      this.company = companys;
    console.log(this.company);

  },
  (error => {
    /* this.errorService.dialogConfig = { ...this.dialogConfig };
    this.errorService.handleError(error); */
    console.log(error);
  })
);


}


  public hasError = (controlName: string, errorName: string) => {
    return this.userForm.controls[controlName].hasError(errorName);
  }

  public onCancel = () => {

  }

  public createOwner = (ownerFormValue) => {
    if (this.userForm.valid) {
      this.executeUserCreation(ownerFormValue);
    }
  }



  private executeUserCreation = (userFormValue) => {
    let user: User = {
      email: userFormValue.email,
      password: userFormValue.password,
      lastname: userFormValue.lastname,
      firstname:userFormValue.firstname,
      companyId: userFormValue.companyId,
      poste:userFormValue.poste,
      role:userFormValue.role,
      phone:userFormValue.phone
    }

    console.log(user);

    let apiUrl = 'users/signup';
    this.usermanagerservice.createUser(apiUrl, user)
      .subscribe(res => {
        /* //let dialogRef = this.dialog.open(SuccessDialogComponent, this.dialogConfig);

        //we are subscribing on the [mat-dialog-close] attribute as soon as we click on the dialog button
        dialogRef.afterClosed()
          .subscribe(result => {
            this.location.back();
          }); */
          console.log(res);

      },
        (error => {
          /* this.errorService.dialogConfig = { ...this.dialogConfig };
          this.errorService.handleError(error); */
          console.log(error);
        })
      )
  }

}
