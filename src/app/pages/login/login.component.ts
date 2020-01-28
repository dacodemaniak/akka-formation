import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from './../../shared/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private _isFormInvalid: boolean = true;

  public loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) { }

  public get isFormInvalid(): boolean {
    return this.loginForm.invalid;
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      'login': [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(5)
        ]) // Default value
      ],
      'password': [
        '',
        Validators.compose([
          Validators.required
        ]) // Default value
      ]
    });
  }

  public login(): void {
    console.log(`Form is submitted with : ${JSON.stringify(this.loginForm.value)}`);
    
    this.userService.processLogin(this.loginForm.value)
      .then((processLoginStatus: boolean) => {
        if (processLoginStatus) {
          console.log(`Have to route to 'home'`);
        } else {
          console.log(`Something went wrong while authentication processing`);
        }
      });
    console.log(`This line was processed before promise was resolved`);
  }

  public ngOnDestroy(): void {}
}
