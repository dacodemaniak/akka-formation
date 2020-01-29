import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user/user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  /**
   * Instance of an observated user
   */
  public user: any;
  public user$: Observable<any>;
  
  constructor(
    private userService: UserService
  ) { }

  public logout(): void {
    this.userService.processLogout();
  }
  
  public ngOnInit(): void {
    this.user$ = this.userService.user;
    this.user$.subscribe((user: any) => {
      console.log(`Hi, i'm the user with content : ${JSON.stringify(user)}`);
      if (user) {
        this.user = user;
      } else {
        this.user = null;
      }
    });
  }

}
