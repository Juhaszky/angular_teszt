import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  userId = 0;
  constructor() { }

  getUsers() {
    return JSON.parse(localStorage.getItem('users') ?? 'null');
  }

  modifyCurrentUser(user: object) {
    return localStorage.setItem('currentUser', JSON.stringify(user));
  }
  setUser(key: string, userValue: any) {
    this.userId++;
    this.userId = this.userId++;
    const registeredUsers = this.getUsers();
    let userTemplate = new User(userValue.email,userValue.password, [], this.userId);
    if(registeredUsers !== null) {
      let users = registeredUsers;
      users.push(userTemplate);
      return localStorage.setItem(key, JSON.stringify(users));
    }
    let tempArr = [];
    tempArr.push(userTemplate)
    localStorage.setItem(key, JSON.stringify(tempArr));
  }

  getLoggedInUserId(): number |undefined {
    return JSON.parse(localStorage.getItem('userId') ?? 'null');
  }

}
