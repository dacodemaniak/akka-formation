import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

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
  
  /**
   * Defines an observer for UserInterface
   */
  private user$: BehaviorSubject<UserInterface> = new BehaviorSubject<UserInterface>(null);

  /**
   * Define an observer to the external world
   */
  public currentUser: Observable<UserInterface> = this.user$.asObservable();

  constructor(
  ) {}

  public isAuthenticated(): boolean {
    return this._user ? true : false;
  }

  public processLogin(datas: any): Promise<any | boolean> {
    return new Promise<boolean>((resolve) => {
      setTimeout(
        () => {
          this._user = {
            loginName: datas.login,
            token: '123456'
          };
          this.user$.next(this._user);

          resolve(true)
        },
        500
      )
    });
  }
}
