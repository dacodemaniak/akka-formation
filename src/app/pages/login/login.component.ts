import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private _isFormInvalid: boolean = true;

  public loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder
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

}
