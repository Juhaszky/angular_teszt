import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {


  constructor() { }

  getUser() {
    return localStorage.getItem('users');
  }
  getCurrentUser() {
    return localStorage.getItem('currentUser');
  }
  modifyCurrentUser(user: object) {
    return localStorage.setItem('currentUser', JSON.stringify(user));
  }
  setUser(key: string, userValue: any) {
    let registeredUsers = this.getUser();
    let userTemplate = new User(userValue.email,userValue.password, []);
    if(registeredUsers) {
      let users = JSON.parse(registeredUsers);
      users.push(userTemplate);
      return localStorage.setItem(key, JSON.stringify(users));
    }
    let tempArr = [];
    tempArr.push(userTemplate)
    localStorage.setItem(key, JSON.stringify(tempArr));
  }

  setLogin() {
    localStorage.setItem('loggedIn',JSON.stringify(true));
  }
}
