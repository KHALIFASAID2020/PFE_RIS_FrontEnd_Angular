import { Component, NgZone } from '@angular/core';
import { AuthService } from 'src/app/login/auth.service';
import { User } from 'src/app/models/auth-data.model';
import { ActionService } from 'src/app/services/action.service';
import {interval} from 'rxjs/internal/observable/interval';


import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

//am4core.useTheme(am4themes_animated);
am4core.useTheme(am4themes_animated);


import { startWith, switchMap } from 'rxjs/operators';
import { ComplaintService } from '../claims/complaint.service';
import { ActionPlanService } from 'src/app/services/action-plan.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  private chart: am4charts.XYChart;

  currentUser: User;
  countAction: any;
  countComplaint: any;
  countActionPlan: any;
 /*  constructor(private authService: AuthService,private actionService:ActionService, private router: Router) { }
 */
  constructor(private authService: AuthService, private zone: NgZone,
              private actionService: ActionService,
              private actionPlanService: ActionPlanService,
              private complaintService: ComplaintService) {
    this.currentUser = this.authService.currentUserValue;
   }

  ngOnInit() {
    this.getAllActionReceivedNotAttribue();
    this.getCountAllReclamationByDestination();
    this.getCountAllActionPlanTeamLeader();
  }

  getAllActionReceivedNotAttribue() {
    /* const id: string = this.activeRoute.snapshot.params.id;
  */
    interval(5000)
    .pipe(
          startWith(0),
          switchMap(() =>  this.actionService.getAllActionReceivedNotAttribue(`Action/getAllActionReceivedNotAttribue/${this.currentUser._id}`))
        )
        .subscribe(result => this.countAction = result
       );

    console.log(this.countAction);

  }

  getCountAllReclamationByDestination() {
    /* const id: string = this.activeRoute.snapshot.params.id;
  */
    interval(5000)
    .pipe(
          startWith(0),
          switchMap(() =>  this.complaintService.getCountAllReclamationByDestination(`reclamation/getCountAllReclamationByDestination/${this.currentUser._id}`))
        )
        .subscribe(result => this.countComplaint = result
       );


  }

  getCountAllActionPlanTeamLeader() {
    /* const id: string = this.activeRoute.snapshot.params.id;
  */
    interval(5000)
    .pipe(
          startWith(0),
          switchMap(() =>  this.actionPlanService.getCountAllActionPlanTeamLeader(`ActionPlan/getCountAllActionPlanTeamLeader/${this.currentUser._id}`))
        )
        .subscribe(result => this.countActionPlan = result
       );


  }


  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {

      let chart = am4core.create("chartdiv", am4charts.PieChart);
      chart.hiddenState.properties.opacity = 0;

      /* let chart = am4core.create("chartdiv", am4charts.XYChart);

      chart.paddingRight = 20; */



      
      chart.data = [
        {
          country: "Fournisseur",
          value: 401
        },
        {
          country: "Client",
          value: 300
        },
        {
          country: "A.A.F Production",
          value: 200
        }
      ];




      chart.radius = am4core.percent(70);
      chart.innerRadius = am4core.percent(40);
      chart.startAngle = 180;
      chart.endAngle = 360;

      let series = chart.series.push(new am4charts.PieSeries());
      series.dataFields.value = "value";
      series.dataFields.category = "country";

      series.slices.template.cornerRadius = 10;
      series.slices.template.innerCornerRadius = 7;
      series.slices.template.draggable = true;
      series.slices.template.inert = true;
      series.alignLabels = false;

      series.hiddenState.properties.startAngle = 90;
      series.hiddenState.properties.endAngle = 90;

      chart.legend = new am4charts.Legend();



    });
  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }

}
