import {Injectable} from '@angular/core';
import {UserModel} from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private storage: Storage;

  constructor() {
    this.storage = localStorage;
  }

  storeItem(key: string, item: string) {
    localStorage.setItem(key, item);
  }

  removeKey(key: string) {
    localStorage.removeItem(key);
  }

  getItem(key: string): string | null {
    return localStorage.getItem(key);
  }
}
