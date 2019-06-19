import { Component, OnInit } from '@angular/core';
import { Action } from 'src/app/models/Action';
import { ActivatedRoute } from '@angular/router';
import { ActionService } from 'src/app/services/action.service';
import { AnalysisGroupService } from 'src/app/services/analysis-group.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ResponsableAction } from 'src/app/models/ResponsableAction';

@Component({
  selector: 'app-corrective-actions',
  templateUrl: './corrective-actions.component.html',
  styleUrls: ['./corrective-actions.component.scss']
})
export class CorrectiveActionsComponent implements OnInit {
  listCorrectiveActions : Action[];
  listUser: ResponsableAction[];

  idPlan: string;
  public FormCorrectiveActions: FormGroup;

  constructor(private activeRoute: ActivatedRoute,
              private actionService: ActionService,
              private analysisGroupeService : AnalysisGroupService,
              private toastr: ToastrService) {
                this.idPlan = this.activeRoute.snapshot.params.id;

              }

  ngOnInit() {
    this.FormCorrectiveActions = new FormGroup({
      position: new FormControl('', [Validators.required]) ,
      description: new FormControl('', [Validators.required]),
      responsableAction: new FormControl('', [Validators.required]) ,
      dateResponse: new FormControl('', [Validators.required])
    });

    this.getAllCorrectiveActions();
    this.getAllResponsableByGroupAnalyse();
  }

  getAllResponsableByGroupAnalyse() {
    const id: string = this.activeRoute.snapshot.params.id;
    this.analysisGroupeService.getAllResponsableByGroupAnalyse(`responsableAction/getAllResponsableByGroupAnalyse/${id}`).subscribe(result => {
      //this.listResponsable = result as User[];
      console.log(result);
      this.listUser = result as ResponsableAction[];

    });
  }

  getAllCorrectiveActions(){
    const idPlan: string = this.activeRoute.snapshot.params.id;

    this.actionService.getActions(`Action/getActions/?idPlan=${idPlan}&ActionType=Corrective Actions`).subscribe(result => {
      this.listCorrectiveActions = result as Action[];
      console.log("All Containement Actions ",this.listCorrectiveActions);
    });
  }



createCorrectiveAction(FormContainementAction){
  const idPlan: string = this.activeRoute.snapshot.params.id;

  const ContainementAction:Action  = {

  refAction: "ACT" + Date.now(),
  position: FormContainementAction.position,
  status: "En cours",
  description: FormContainementAction.description,
  responsableAction: FormContainementAction.responsableAction,
  dateResponse: FormContainementAction.dateResponse

  }
  this.createAction(ContainementAction, 'Action/AddAction', idPlan, 'Corrective Actions');
}





createAction(action:Action,route:string,idPlan : string,ActionType:string){

  this.actionService.createAction(`${route}/?idPlan=${idPlan}&ActionType=${ActionType}`, action)
  .subscribe((result) => {
    console.log(result);
    this.toastr.success(`${ActionType} Of this Plan created`);
  }, (error) => {
    console.error(error);
    this.toastr.warning(`${ActionType} Of this Plan Error`,error);
  });
}
/* getAllContainementActions(){
  const idPlan: string = this.activeRoute.snapshot.params.id;

  this.actionService.getActions(`Action/getActions/?idPlan=${idPlan}&ActionType=Containement Actions`).subscribe(result => {
    this.listContainementActions = result as Action[];
    console.log("All Containement Actions ",this.listContainementActions);
  });
}
} */
}

