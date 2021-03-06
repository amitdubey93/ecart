import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
@Injectable()
export class ProductDataService {
  private baseUrl = "http://localhost:3000/";
  constructor(private http: HttpClient) {}
  getAllProducts(): Observable<any> {
    return this.http.get<any>(this.baseUrl + "products");
  }
}
