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
private chartPPM : am4charts.XYChart;
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





    this.zone.runOutsideAngular(() => {
      let chartPPM = am4core.create("chartdivPPM", am4charts.XYChart);

      // Add percent sign to all numbers
      chartPPM.numberFormatter.numberFormat = "#.3'%'";

      // Add data
      chartPPM.data = [{
          "Article": "AG246",
          "PPM": 3.5,
          "supplied": 10
      }, {
          "Article": "AG213",
          "PPM": 1.7,
          "supplied": 11.5
      }, {
          "Article": "AG80",
          "PPM": 2.8,
          "supplied": 11
      }, {
          "Article": "AG172",
          "PPM": 2.6,
          "supplied": 12
      }, {
          "Article": "AB01B",
          "PPM": 1.4,
          "supplied": 7
      }, {
          "Article": "AK44",
          "PPM": 2.6,
          "supplied": 8
      }];

      // Create axes
      let categoryAxis = chartPPM.xAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = "Article";
      categoryAxis.renderer.grid.template.location = 0;
      categoryAxis.renderer.minGridDistance = 30;

      let valueAxis = chartPPM.yAxes.push(new am4charts.ValueAxis());
      valueAxis.title.text = "PPM Parts Per Million ";
     // valueAxis.title.fontWeight = 800;

      // Create series
      let series = chartPPM.series.push(new am4charts.ColumnSeries());
      series.dataFields.valueY = "PPM";
      series.dataFields.categoryX = "Article";
      series.clustered = false;
      series.tooltipText = "PPM {categoryX} (2019): [bold]{valueY}[/]";

      let series2 = chartPPM.series.push(new am4charts.ColumnSeries());
      series2.dataFields.valueY = "supplied";
      series2.dataFields.categoryX = "Article";
      series2.clustered = false;
      series2.columns.template.width = am4core.percent(50);
      series2.tooltipText = "Quantity supplied {categoryX} (2019): [bold]{valueY}[/]";

      chartPPM.cursor = new am4charts.XYCursor();
      chartPPM.cursor.lineX.disabled = true;
      chartPPM.cursor.lineY.disabled = true;

    });



































  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.chart) {
        this.chart.dispose();
      }
      if (this.chartPPM) {
        this.chart.dispose();
      }
    });
  }

}
