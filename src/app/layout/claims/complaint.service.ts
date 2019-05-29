import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import {Complaint} from './complaint.model';
export class TypeCompany {
    _id :string;
    type_company :string;
}

@Injectable({
  providedIn: 'root'
})
export class ComplaintService {
  listTypeCompany : TypeCompany[];

  constructor(private http: HttpClient) { }

  public getTypeCompany(route: string) {
    return this.http.get(this.createCompleteRoute(route, environment.urlAddress)) ;
  }


  public  CompanyByTypeCompany(route: string) {
    return this.http.get(this.createCompleteRoute(route, environment.urlAddress));
   }


   public  getByIdCompanyProduit(route: string) {
    return this.http.get(this.createCompleteRoute(route, environment.urlAddress));
   }

  public getAllFault(route: string) {
    return this.http.get(this.createCompleteRoute(route, environment.urlAddress));
  }

  private createCompleteRoute(route: string, envAddress: string) {
    return `${envAddress}/${route}`;
  }
}
