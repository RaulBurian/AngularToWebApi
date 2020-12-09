import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private storage: Storage;

  constructor() {
    this.storage = localStorage;
  }

  storeItem(key: string, item: string): void {
    localStorage.setItem(key, item);
  }

  removeKey(key: string): void {
    localStorage.removeItem(key);
  }

  getItem(key: string): string | null {
    return localStorage.getItem(key);
  }
}
