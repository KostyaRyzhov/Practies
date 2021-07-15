import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
import {Page} from "../Page";


export class Product {

  constructor(public id: number, public productName: string, public productPrice: number, public productColor: string  ) {
  }
}

@Injectable()
export class HttpService {

  constructor(private http: HttpClient) {

  }

  postReq(product: Product): Observable<Product> {
    return this.http.post<Product>("http://localhost:8080/hello/post", product)
  }

  delReq(id: number): Observable<number> {
    return this.http.post<number>("http://localhost:8080/hello/delete",id);
  }

  updReq(product: Product, id:number): Observable<Product>{
    return  this.http.post<Product>("http://localhost:8080/hello/update/" + id.toString(), product)
  }

  pageReq(page: Page): Observable<Product[]> {
    return this.http.post<Product[]>("http://localhost:8080/hello/getPage", page)
  }

  filterReq(product: Product, str: string): Observable<Product[]>{
    return this.http.post<Product[]>("http://localhost:8080/hello/"+str+"/filter", product);
  }

  countReq(count: number): Observable<number>{
    return this.http.post<number>("http://localhost:8080/hello/getCount",count);
  }

}
