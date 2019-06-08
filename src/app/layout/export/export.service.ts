import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Export } from './Export-model';
@Injectable({
  providedIn: 'root'
})
export class ExportService {

  constructor(private http: HttpClient) { }

  public delete(route: string){
    return this.http.delete(this.createCompleteRoute(route, environment.urlAddress));
  }

  public listAllExport(route){
    return this.http.get(this.createCompleteRoute(route,environment.urlAddress));
  }
  public update(route: string, body){
    return this.http.put(this.createCompleteRoute(route, environment.urlAddress), body, this.generateHeaders());
  }

  create(route,body: Export) {
     return this.http.post(this.createCompleteRoute(route, environment.urlAddress), body, this.generateHeaders());
   }

  public getTypeAllCompany(route: string){
    return this.http.get(this.createCompleteRoute(route,environment.urlAddress));
  }

  public getProduitByType(route: string){
    return this.http.get(this.createCompleteRoute(route,environment.urlAddress));
  }

  public getAllProduct(route: string) {
    return this.http.get(this.createCompleteRoute(route, environment.urlAddress));
  }

  public getAllCompany(route : string){
    return this.http.get(this.createCompleteRoute(route,environment.urlAddress));
  }

  private createCompleteRoute(route: string, envAddress: string) {
    return `${envAddress}/${route}`;
  }

  private generateHeaders() {
    return {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
  }

}
