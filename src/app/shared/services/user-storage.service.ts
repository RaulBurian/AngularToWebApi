import { Injectable } from '@angular/core';
import {UserModel} from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserStorageService {

  private storage: Storage;
  private KEY: string="user";

  constructor() {
    this.storage=localStorage;
  }

  storeUser(user: UserModel){
    localStorage.setItem(this.KEY,JSON.stringify(user));
  }

  removeUser(){
    localStorage.removeItem(this.KEY);
  }

  getUser(): string | null{
    return localStorage.getItem(this.KEY);
  }
}
