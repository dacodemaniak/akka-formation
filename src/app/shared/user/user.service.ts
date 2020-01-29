import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

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

  constructor(
    private router: Router
  ) {}

  public isAuthenticated(): boolean {
    return this._user ? true : false;
  }

  public get user(): Observable<UserInterface> {
    return this.user$;
  }

  public getUser(): UserInterface {
    return this._user;
  }

  public processLogout(): void {
    this._user = null;
    this.user$.next(this._user); // Emit the new user status
    this.router.navigate(['login']);
  }

  public processLogin(datas: any): Promise<any | boolean> {
    return new Promise<boolean>((resolve) => {
      setTimeout(
        () => {
          this._user = {
            loginName: datas.login,
            token: '123456'
          };
          this.user$.next(this._user); // Emit the user changes
          
          localStorage.setItem('user', JSON.stringify(this._user));
          
          resolve(true)
        },
        500
      )
    });
  }
}
