import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Category } from '../model/category';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
    private host = environment.apiUrl;
    getCategoriesURL: string;

  constructor(private http: HttpClient) { 
    this.getCategoriesURL = `${this.host}/categories`;
  }

  getAllCategories(): Observable<any> {
    console.log('this.getCategoriesURL',this.getCategoriesURL);
    return this.http.get<any>(this.getCategoriesURL);
  }
}
