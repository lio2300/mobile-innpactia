import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  public FormRegister: FormGroup;
  public ValidatorPass: boolean = false;
  constructor(
    private BuilderRegister: FormBuilder,
    public _LoginService: LoginService
  ) {
    this.FormRegister = this.BuilderRegister.group({
      user_firstname: ['', Validators.required],
      user_lastname: ['', Validators.required],
      user_nick: ['', Validators.required],
      user_email: ['', Validators.required],
      user_pass: ['', Validators.required],
      confirm_password: ['', Validators.required]
    });

    this.FormRegister.valueChanges.subscribe(value => {
      const { user_pass, confirm_password } = value;
      this.ValidatorPass = user_pass === confirm_password && (user_pass && confirm_password);
    });
  }

  get f() {
    return this.FormRegister.controls;
  }

  SendDataToServer() {
    this._LoginService.DataLoading = !this._LoginService.DataLoading;
    let datos = this.FormRegister.getRawValue();
    this._LoginService.ValidatorData('R', datos).subscribe(resp => {
    });
  }

}
