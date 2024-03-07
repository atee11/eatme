import { Injectable } from '@angular/core';
import { openDB } from 'idb';

@Injectable({
  providedIn: 'root'
})
export class IDBService {
  constructor() { }

  async db() {
    return openDB('myDB', 2, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('users')) {
          db.createObjectStore('users');
        }
        if (!db.objectStoreNames.contains('emails')) {
          db.createObjectStore('emails');
        }
      },
    });
  }

  async add(storeName: string, item: any, key?: string) {
    const db = await this.db();
    return db.put(storeName, item, key);
  }

  async get(storeName: string, id: string) {
    const db = await this.db();
    return db.get(storeName, id);
  }
}
