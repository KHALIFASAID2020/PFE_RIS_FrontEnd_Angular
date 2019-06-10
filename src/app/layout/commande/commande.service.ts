import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Commande } from './Commande-model';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {

  constructor(private http: HttpClient) { }

  public listAllProduit(route){
    return this.http.get(this.createCompleteRoute(route,environment.urlAddress));
  }
  public getAllCompany(route : string){
    return this.http.get(this.createCompleteRoute(route,environment.urlAddress));
  }

  create(route,body: Commande) {
    return this.http.post(this.createCompleteRoute(route, environment.urlAddress), body, this.generateHeaders());
  }

  public listAllCommande(route){
    return this.http.get(this.createCompleteRoute(route,environment.urlAddress));
  }
  public update(route: string, body){
    return this.http.put(this.createCompleteRoute(route, environment.urlAddress), body, this.generateHeaders());
  }
  public delete(route: string){
    return this.http.delete(this.createCompleteRoute(route, environment.urlAddress));
  }
  /*
  public delete(route: string){
    return this.http.delete(this.createCompleteRoute(route, environment.urlAddress));
  }

  public listAllExport(route){
    return this.http.get(this.createCompleteRoute(route,environment.urlAddress));
  }
  public update(route: string, body){
    return this.http.put(this.createCompleteRoute(route, environment.urlAddress), body, this.generateHeaders());
  }

  create(route,body: Commande) {
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
*/


  private createCompleteRoute(route: string, envAddress: string) {
    return `${envAddress}/${route}`;
  }

  private generateHeaders() {
    return {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
  }
}
