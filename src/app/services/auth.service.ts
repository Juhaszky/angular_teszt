import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private localStorageService: LocalStorageService, private router: Router) { }
  


  checkCredentials(userCred: {email: string, password: string}) {
    let registeredUsers = this.localStorageService.getUser();
    
    if(registeredUsers) {
      let users = JSON.parse(registeredUsers);
      let user = users.filter((userData:User) => userData.email == userCred.email)
      .map((data: any) => {
        if(data.password == userCred.password) {
          this.localStorageService.setLogin();
          localStorage.setItem('currentUser',JSON.stringify(data));
          this.router.navigateByUrl('dashboard');
        } else {
          alert('Hibás jelszó!');
        }
      });
      if(user.length == 0) {
        alert('Sikeresen regisztráltál!');
        this.signUp(userCred);
      }
    } else {
      this.signUp(userCred);
      alert('Sikeresen regisztráltál!');
    }
    }
  


  signUp(userData: object) {
    this.localStorageService.setUser('users',userData)
  }

  isLoggedIn() {
    return localStorage.getItem('loggedIn')!=null?true:false;
  }
}
