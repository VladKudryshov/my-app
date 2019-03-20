import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../models/user';
import {CurrentUser} from '../models/currentUser';


@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<User[]>(`http://localhost:8080/api/users`, {headers: new HttpHeaders({'Authorization': localStorage.getItem('token')})});
  }

  getById(id: number) {
    return this.http.get<CurrentUser>(`http://localhost:8080/api/users/info/${id}`, {headers: new HttpHeaders({'Authorization': localStorage.getItem('token')})});
  }
}
