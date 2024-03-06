import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user = new BehaviorSubject<{ username: string } | null>(null);

  user$ = this.user.asObservable();

  setUser(user: null) {
    this.user.next(user);
  }
}

