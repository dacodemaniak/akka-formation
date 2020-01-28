import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';

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

  constructor(
  ) {}

  public isAuthenticated(): boolean {
    return this._user ? true : false;
  }

  public processLogin(datas: any): Promise<any | boolean> {
    return new Promise<boolean>((resolve) => {
      setTimeout(
        () => resolve(true),
        500
      )
    });
  }
}
