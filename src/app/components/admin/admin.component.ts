import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import {UserService} from '../../services/user.service';
import {User} from '../../models/user';



@Component({templateUrl: 'admin.component.html'})
export class AdminComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getAll().pipe(first()).subscribe((users: User[]) => {
      console.log(users)
    });

  }
}
