import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-containement-actions',
  templateUrl: './containement-actions.component.html',
  styleUrls: ['./containement-actions.component.scss']
})
export class ContainementActionsComponent implements OnInit {
idPlan:string;
  constructor(private activeRoute: ActivatedRoute) {
     this.idPlan= this.activeRoute.snapshot.params.id;
  }

  ngOnInit() {



  }

}
