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
  getAllProductsURL : string;
  getAllProductsByCategoryNameURL : string;

  constructor(private http: HttpClient) { 
    this.getAllProductsURL = `${this.host}/products`;
    this.getAllProductsByCategoryNameURL = `${this.host}/productByCategory/`;
  }

  getAllProducts(): Observable<Product[]> {
    console.log(this.getAllProductsURL)
    return this.http.get<Product[]>(this.getAllProductsURL);
  }

  getAllProductsByCategoryName(categoryName : string): Observable<Product[]> {
    this.getAllProductsByCategoryNameURL += categoryName;
    console.log(this.getAllProductsByCategoryNameURL)
    return this.http.get<Product[]>(this.getAllProductsByCategoryNameURL);
  }

  // getAllProductsByCategoryId(): Observable<Product[]> {
  //   console.log(this.getAllProductsByCategoryIdURL)
  //   return this.http.get<Product[]>(this.getAllProductsByCategoryIdURL);
  // }

  public getProductFromLocalCache(): Product {
    return JSON.parse(localStorage.getItem('product')|| '{}');
  }

  public addProductToLocalCache(product: Product): void {
    localStorage.setItem('product', JSON.stringify(product));
  }

  public removeProductFromLocalCache(): void {
    localStorage.removeItem('product');
  }
}
