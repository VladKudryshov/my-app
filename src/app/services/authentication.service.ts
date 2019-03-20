import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {CurrentUser} from '../models/currentUser';


@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<CurrentUser>;
  public currentUser: Observable<CurrentUser>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<CurrentUser>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): CurrentUser {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {

    return this.http.post<any>(`http://localhost:8080/api/users/login`, { login:username, password : password }, {observe: 'response'})
      .pipe(map(response => {
        console.log(response.headers.get("Authorization"))
        localStorage.setItem('token', response.headers.get("Authorization"))
        if (response.body) {
          localStorage.setItem('currentUser', JSON.stringify(response.body));
          this.currentUserSubject.next(response.body);
        }

        return response.body;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
