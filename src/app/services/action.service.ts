import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {BehaviorSubject} from 'rxjs';
import {Action} from '../models/Action';


@Injectable({
  providedIn: 'root'
})
export class ActionService {
 /*  dataChange: BehaviorSubject<Action[]> = new BehaviorSubject<Action[]>([]);
  dialogData: any; */


constructor(private http: HttpClient) { }
/*
get data(): Action[] {
  return this.dataChange.value;
}

getDialogData() {
  return this.dialogData;
}

getAllActionByActionPlan(route: string): void {
  this.http.get<Action[]>(this.createCompleteRoute(route, environment.urlAddress)).subscribe(data => {
      this.dataChange.next(data);
    },
    (error: HttpErrorResponse) => {
    console.log (error.name + ' ' + error.message);
    });
} */



 public  getAllTypeAction(route: string) {
  return this.http.get(this.createCompleteRoute(route, environment.urlAddress));
 }


 public  getActions(route: string) {
  return this.http.get(this.createCompleteRoute(route, environment.urlAddress));
 }

 public  getActionById(route: string) {
  return this.http.get(this.createCompleteRoute(route, environment.urlAddress));
 }

//getActionReceived
public  getActionReceived(route: string) {
  return this.http.get(this.createCompleteRoute(route, environment.urlAddress));
 }
/*  getActionByIdforUpdate(){

 } */

public deleteAction(route: string){
  return this.http.delete(this.createCompleteRoute(route, environment.urlAddress));
}

private createCompleteRoute(route: string, envAddress: string) {
  return `${envAddress}/${route}`;
}

public updateActionByCreator(route: string, body){
  return this.http.put(this.createCompleteRoute(route, environment.urlAddress), body, this.generateHeaders());
}

public createAction (route: string, body) {
  return this.http.post(this.createCompleteRoute(route, environment.urlAddress), body,this.generateHeaders());
}

private generateHeaders() {
  return {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }
}
}
