import { Component, OnInit, ViewChild } from '@angular/core';
import { ActionPlanService } from 'src/app/services/action-plan.service';
import { ActivatedRoute } from '@angular/router';
import { ActionPlan } from '../../../models/Action-Plan-model';
import { AnalysisGroupService } from 'src/app/services/analysis-group.service';
import { User } from 'src/app/models/auth-data.model';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AnalysisGroup } from 'src/app/models/AnalysisiGroupModel';
import { ToastrService } from 'ngx-toastr';
import { ResponsableAction } from 'src/app/models/ResponsableAction';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { ActionService } from 'src/app/services/action.service';
import { ActionType } from 'src/app/models/ActionType';
import { Action } from 'src/app/models/Action';

@Component({
  selector: 'app-detailsactionplan',
  templateUrl: './detailsactionplan.component.html',
  styleUrls: ['./detailsactionplan.component.scss']
})
export class DetailsactionplanComponent implements OnInit {
  listActionType : ActionType[]
  listContainementActions : Action[];
  listUser : User[];
  listResponsable : ResponsableAction[]

  public descriptionForm: FormGroup;
  public ResponsableGroupForm: FormGroup;
  public FormContainementActions:FormGroup;
  public FormCorrectiveActions:FormGroup;

  refGroup = new AnalysisGroup();
  public idGroup:string;
  refActionPlan = new ActionPlan();


  public displayedColumns = ['RES REF','Name','Poste','Phone','Details','delete'];
  public dataSource = new MatTableDataSource<ResponsableAction>();

 // @ViewChild('CommandeForm') form;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;


//idType : string

  constructor(private actionPlanService : ActionPlanService,
    private analysisGroupeService : AnalysisGroupService,private toastr: ToastrService,
    private activeRoute: ActivatedRoute,private actionService : ActionService
    ) {



     // this.getGroupAnalyseByIdActionPlan();

      //getAllResponsableByGroupAnalyse()
    /*   this.getAllUser();
      this.getAllResponsableByGroupAnalyse();
      console.log('Ref Group For Responsable',this.idGroup); */

    }

    ngOnInit() {

      this.descriptionForm = new FormGroup({
        description: new FormControl('', [Validators.required])   });

        this.FormContainementActions = new FormGroup({
          position: new FormControl('', [Validators.required]) ,
          description: new FormControl('', [Validators.required]),
          responsableAction: new FormControl('', [Validators.required]) ,
          dateResponse:new FormControl('', [Validators.required])
        });

          this.FormCorrectiveActions = new FormGroup({
            position: new FormControl('', [Validators.required]) ,
            description: new FormControl('', [Validators.required]),
            responsableAction: new FormControl('', [Validators.required]) ,
            dateResponse:new FormControl('', [Validators.required])    });


        this.ResponsableGroupForm = new FormGroup({
          responsableAction: new FormControl('', [Validators.required])   });
        this.getAllUser();
        this.getAllResponsableByGroupAnalyse();
         this.getComplaintRefByIdActionPlan();
       // this.getAllContainementActions('Containement Actions');
     //   this.getAllTypeAction();
       // this.idType = this.CallbackFunctionToFindTypeById ("Containement Actions") ;


    }





    private getComplaintRefByIdActionPlan = () => {
      const id: string = this.activeRoute.snapshot.params.id;
      this.actionPlanService.getComplaintRefByActionPlanId(`ActionPlan/${id}`)
      .subscribe(res => {
       this.refActionPlan = res as ActionPlan
        console.log(res);
      },
      (error) => {
       console.log(error);
      });
    }

/* ---------- Group Analyse ---------------------*/
getAllUser(){
  this.analysisGroupeService.getAllResponsableAction(`users/`).subscribe(result => {
    this.listUser = result as User[];
 });
}



createResponsableAction(formgroup){
  const id: string = this.activeRoute.snapshot.params.id;
  const Responsable:ResponsableAction  = {
  RefResponsable:'RES' + Date.now(),
  responsableAction :formgroup.responsableAction,
  }
console.log(Responsable);
  this.analysisGroupeService.create(`responsableAction/createresponsable/${id}`, Responsable)
  .subscribe((result) => {
    console.log(result);
    this.getAllResponsableByGroupAnalyse();
    this.toastr.success('Responsable of this Action Plan Created!');
  }, (error) => {
    console.error(error);
    this.toastr.warning('Responsable of this Action Exist!',error);
  });
}

getAllResponsableByGroupAnalyse() {
  const id: string = this.activeRoute.snapshot.params.id;
  this.analysisGroupeService.getAllResponsableByGroupAnalyse(`responsableAction/getAllResponsableByGroupAnalyse/${id}`).subscribe(result => {
    //this.listResponsable = result as User[];
    console.log(result);
    this.dataSource.data = result as ResponsableAction[];

  });
}


ngAfterViewInit(): void {
  this.dataSource.sort = this.sort;
  this.dataSource.paginator = this.paginator;
}


public doFilter = (value: string) => {
  this.dataSource.filter = value.trim().toLocaleLowerCase();
}



redirectToDetailsActionPlan(_id){

}

onDelete(_id: string) {
 /*  if (confirm('Are you sure to delete this record ?') == true) {
    this.commandeService.delete(`commande/${_id}`).subscribe((res) => {
      //this.refreshEmployeeList();
      //this.resetForm(form);
      this.toastr.error('Fault deleted','Fault deleted');

      this.resetObject();
      console.log('Default deleted');
    this.getAllcommande();

    });
  } */
}
/* private getGroupAnalyseByIdActionPlan = () => {
  const id: string = this.activeRoute.snapshot.params.id;
  this.analysisGroupeService.getAnalysisGroupByActionPlan(`Groupe/groupeByActionPlan/${id}`)
  .subscribe(res => {

   this.refGroup = res[0] as AnalysisGroup;
  this.idGroup = this.refGroup._id;
   console.log('REF Group Action',this.refGroup._id);
  },
  (error) => {
   console.log(error);
  });
} */

/*


/* ----------Fin Group Analyse ---------------------*/



/* ------------ Problem Description---------------*/

createdescription(descriptionForm){
  console.log(descriptionForm);

}

//https://stackabuse.com/get-query-strings-and-parameters-in-express-js/





  public executeSelectedChange = (event) => {
    console.log(event);
  }
}
