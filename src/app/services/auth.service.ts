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
    const registeredUsers = this.localStorageService.getUsers();
    console.log(registeredUsers);
    console.log("registeredusers:");
    if(registeredUsers !== null) {
      const user = registeredUsers.find((userData:User) => userData.email === userCred.email);
      if(user) { 
        if(user.password === userCred.password) {
          localStorage.setItem('userId', JSON.stringify(user.id));
          return this.router.navigateByUrl('dashboard');
        } else {
          return alert('Hibás jelszó!');
        } 
      } else {
        this.signUp(userCred);
        alert('Sikeresen regisztráltál!');
      }
    } else {
      this.signUp(userCred);
      alert('Sikeresen regisztráltál!');
    }
  }

  signUp(userData: object) {
    this.localStorageService.setUser('users',userData);
  }

  isLoggedIn() {
    return localStorage.getItem('userId') !== null;
  }
}
