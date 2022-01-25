import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public FormLogin: FormGroup;

  constructor(
    private BuilderLogin: FormBuilder,
    public _LoginService: LoginService
  ) {
    this.FormLogin = this.BuilderLogin.group({
      user_name: ['', Validators.required],
      user_pass: ['', Validators.required]
    });
  }

  SenDataServer() {
    this._LoginService.DataLoading = !this._LoginService.DataLoading;
    let datos = this.FormLogin.getRawValue();
    this._LoginService.ValidatorData('L', datos).subscribe(resp => {
    });
  }

}
