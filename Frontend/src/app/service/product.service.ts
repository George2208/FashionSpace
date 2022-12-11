import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Category } from '../model/category';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private host = environment.apiUrl;
  getAllProductsByCategoryIdURL : string;

  constructor(private http: HttpClient) { 
    this.getAllProductsByCategoryIdURL = `${this.host}/products`;
  }

  getAllProductsByCategoryId(): Observable<Product[]> {
    console.log(this.getAllProductsByCategoryIdURL)
    return this.http.get<Product[]>(this.getAllProductsByCategoryIdURL);
  }
}
