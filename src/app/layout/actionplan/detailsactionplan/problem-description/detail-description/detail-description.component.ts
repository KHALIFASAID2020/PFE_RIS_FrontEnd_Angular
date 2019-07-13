import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DescriptionService } from 'src/app/services/description.service';
import { ProblemDescription } from 'src/app/models/ProblemDescription';

@Component({
  selector: 'app-detail-description',
  templateUrl: './detail-description.component.html',
  styleUrls: ['./detail-description.component.scss']
})
export class DetailDescriptionComponent {
  public descriptionForm: FormGroup;
  description : ProblemDescription;

  constructor(private formBuilder: FormBuilder,private descriptionService:DescriptionService,public dialogRef: MatDialogRef<DetailDescriptionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {


    this.descriptionForm  = this.formBuilder.group({
      description: ['', Validators.required]
    });
/*     this.getDescriptionPlanByIdPlan();
 */
  }

getdescriptionById(){
this.descriptionService.getdescriptionById(`problemdescription/${this.data.id}`).subscribe(result => {
  //this.listResponsable = result as User[];
  this.description = result[0] as ProblemDescription
  console.log("Description Problem ...................",this.description);
  //this.listUser = result as ResponsableAction[];

});

}


  onNoClick(): void {
    this.dialogRef.close();
  }



  /* getDescriptionPlanByIdPlan(){
    this.idPlan = this.activeRoute.snapshot.params.id;
    this.descriptionService.getdescriptionPlan(`problemdescription/getDescriptionByIdPlan/${this.idPlan}`).subscribe(result => {
      //this.listResponsable = result as User[];
      this.description = result[0] as ProblemDescription
      console.log("Description Problem ...................",this.description);
      //this.listUser = result as ResponsableAction[];

    });
  } */
}
