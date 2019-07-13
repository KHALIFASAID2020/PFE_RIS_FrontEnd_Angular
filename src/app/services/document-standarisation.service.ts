import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders,HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DocumentStandarisationService {

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



   public  getAllDocumentStandaristion(route: string) {
    return this.http.get(this.createCompleteRoute(route, environment.urlAddress));
   }


   public deleteDocumentStandaristion(route: string){
    return this.http.delete(this.createCompleteRoute(route, environment.urlAddress));
  }


  public updateDocumentStandaristion(route: string, body){
    return this.http.put(this.createCompleteRoute(route, environment.urlAddress), body, this.generateHeaders());
  }

  public createDocumentStandaristion(route: string, body) {
    return this.http.post(this.createCompleteRoute(route, environment.urlAddress), body,this.generateHeaders());
  }



  /*  public  getActions(route: string) {
    return this.http.get(this.createCompleteRoute(route, environment.urlAddress));
   }

   public  getActionById(route: string) {
    return this.http.get(this.createCompleteRoute(route, environment.urlAddress));
   }

  //getActionReceived
  public  getActionReceived(route: string) {
    return this.http.get(this.createCompleteRoute(route, environment.urlAddress));
   } */
  /*  getActionByIdforUpdate(){

   } */
/*
  public deleteAction(route: string){
    return this.http.delete(this.createCompleteRoute(route, environment.urlAddress));
  }


  public updateActionByCreator(route: string, body){
    return this.http.put(this.createCompleteRoute(route, environment.urlAddress), body, this.generateHeaders());
  }

  public createAction (route: string, body) {
    return this.http.post(this.createCompleteRoute(route, environment.urlAddress), body,this.generateHeaders());
  }
   */
  private generateHeaders() {
    return {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
  }


  private createCompleteRoute(route: string, envAddress: string) {
    return `${envAddress}/${route}`;
  }
  }
