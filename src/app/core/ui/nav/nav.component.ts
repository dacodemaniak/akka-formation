import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user/user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  public user: any;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.userService.currentUser.subscribe((user: any) => {
      console.log(`Hi, i'm the user with content : ${JSON.stringify(user)}`);
      if (user) {
        this.user = user;
      }
    });
  }

}
