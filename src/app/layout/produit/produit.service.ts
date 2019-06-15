import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Produit } from '../../models/produit-model';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  constructor(private http: HttpClient) { }

  public delete(route: string){
    return this.http.delete(this.createCompleteRoute(route, environment.urlAddress));
  }

  public listAllProduct(route){
    return this.http.get(this.createCompleteRoute(route,environment.urlAddress));
  }
  public update(route: string, body){
    return this.http.put(this.createCompleteRoute(route, environment.urlAddress), body, this.generateHeaders());
  }

  create(route,body: Produit) {
     return this.http.post(this.createCompleteRoute(route, environment.urlAddress), body, this.generateHeaders());
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
