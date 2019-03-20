import { Component } from '@angular/core';
import { first } from 'rxjs/operators';
import {UserService} from '../../services/user.service';
import {AuthenticationService} from '../../services/authentication.service';
import {CurrentUser} from '../../models/currentUser';


@Component({templateUrl: 'home.component.html'})
export class HomeComponent {
  currentUser: CurrentUser;
  userFromApi: CurrentUser;

  constructor(
    private userService: UserService,
    private authenticationService: AuthenticationService
  ) {
    this.currentUser = this.authenticationService.currentUserValue;
  }

  ngOnInit() {
    this.userService.getById(this.currentUser.id).pipe(first()).subscribe(user => {
      this.userFromApi = user;
    });
  }
}
