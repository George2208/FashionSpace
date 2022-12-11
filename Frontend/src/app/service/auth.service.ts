import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public host = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public login(user: User): Observable<HttpResponse<any>> {
    return this.http.post<User>(`${this.host}/login`, user, { observe: 'response' });
  }

  public register(user: User): Observable<User> {
    return this.http.post<User>(`${this.host}/register`, user);
  }

  public addUserToLocalCache(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

 
}
