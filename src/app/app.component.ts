import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {AuthenticationService} from './services/authentication.service';
import {Role} from './models/role';
import {CurrentUser} from './models/currentUser';


@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent {
  currentUser: CurrentUser;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  get isAdmin() {
    console.log(this.currentUser.role === Role.ADMIN)
    return this.currentUser && this.currentUser.role === Role.ADMIN;
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
