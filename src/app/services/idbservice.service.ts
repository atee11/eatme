import { Injectable } from '@angular/core';
import { openDB } from 'idb';

@Injectable({
  providedIn: 'root'
})
export class IDBService {
  constructor() { }

  async db() {
    return openDB('myDB', 1, {
      upgrade(db) {
        db.createObjectStore('users');
      },
    });
  }

  async add(storeName: string, item: any) {
    const db = await this.db();
    return db.put(storeName, item, item.username);
  }

  async get(storeName: string, id: string) {
    const db = await this.db();
    return db.get(storeName, id);
  }
}
