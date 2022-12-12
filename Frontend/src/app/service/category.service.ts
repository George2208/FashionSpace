import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Category } from '../model/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private host = environment.apiUrl;
  getAllCategoriesURL: string;

  constructor(private http: HttpClient) {
    this.getAllCategoriesURL = `${this.host}/categories`;
   }

   getAllCategories(): Observable<Category[]> {
    console.log('url', this.getAllCategoriesURL)
    return this.http.get<Category[]>(this.getAllCategoriesURL);
  }

  public getCategoryFromLocalCache(): Category {
    return JSON.parse(localStorage.getItem('category')|| '{}');
  }

  public addCategoryToLocalCache(category: Category): void {
    localStorage.setItem('category', JSON.stringify(category));
  }

  public removeCategoryFromLocalCache(): void {
    localStorage.removeItem('category');
  }
}
