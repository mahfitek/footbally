import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type Role = 'player' | 'team';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private loggedIn$ = new BehaviorSubject<boolean>(false);

  isLoggedIn(): boolean {
  return !!localStorage.getItem('token');
}

getRole(): 'player' | 'team' | null {
  return localStorage.getItem('role') as any;
}


  login(email: string, phone: string, role: Role) {
    console.log('LOGIN:', email, phone, role);
    this.loggedIn$.next(true);
  }

  logout() {
    this.loggedIn$.next(false);
  }
}
