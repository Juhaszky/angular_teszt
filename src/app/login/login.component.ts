import { Component } from '@angular/core';
import {FormControl, Validators, } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private authService: AuthService) {}
  hide = true;
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.min(3) ]);
  visible = true;
  form = {
    email: '',
    password: ''
  };

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
  

  login() {
    if(this.form.email && this.form.password != "") {
      this.authService.checkCredentials(this.form);
    }
  }

  createNewAccount() {
    this.authService.signUp(this.form);
  }
  
}
