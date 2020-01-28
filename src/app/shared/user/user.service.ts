import { Injectable } from '@angular/core';

interface UserInterface {
  token?: String,
  loginName: String,
  email?: String
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _user: UserInterface;

  constructor() {}

  isAuthenticated(): boolean {
    return this._user ? true : false;
  }
}
