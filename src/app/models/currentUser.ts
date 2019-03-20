import {Role} from './role';

export class CurrentUser {
  id: number;
  role: Role;


  constructor(id: number, role: Role) {
    this.id = id;
    this.role = role;
  }
}
