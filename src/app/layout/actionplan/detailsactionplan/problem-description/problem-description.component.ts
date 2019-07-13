import { Component, OnInit } from '@angular/core';
import { DescriptionService } from 'src/app/services/description.service';
import { ActivatedRoute } from '@angular/router';
import { ProblemDescription } from 'src/app/models/ProblemDescription';
import { MatDialog } from '@angular/material';
import { DetailDescriptionComponent } from './detail-description/detail-description.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-problem-description',
  templateUrl: './problem-description.component.html',
  styleUrls: ['./problem-description.component.scss']
})
export class ProblemDescriptionComponent implements OnInit {
  idPlan: string;

description : ProblemDescription;
// tslint:disable-next-line: max-line-length
  constructor(private descriptionService:DescriptionService,public dialog: MatDialog,private activeRoute: ActivatedRoute) { }

  ngOnInit() {



this.getDescriptionPlanByIdPlan();


  }

  getDescriptionPlanByIdPlan(){
    this.idPlan = this.activeRoute.snapshot.params.id;
    this.descriptionService.getdescriptionPlan(`problemdescription/getDescriptionByIdPlan/${this.idPlan}`).subscribe(result => {
      //this.listResponsable = result as User[];
      this.description = result as ProblemDescription
      console.log("Description Problem ...................",this.description);
      //this.listUser = result as ResponsableAction[];

    });
  }



  redirectToDescriptionDialog(id: string) {

    const dialogRef = this.dialog.open(DetailDescriptionComponent, {
     // data: {id: id}
    })

    dialogRef.afterClosed().subscribe(result => {
      this.getDescriptionPlanByIdPlan();

    });
    console.log(id);


  }





}
