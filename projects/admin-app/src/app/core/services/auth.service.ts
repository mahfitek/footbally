import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private TOKEN_KEY = 'admin_token';

  login(email: string, password: string): Observable<boolean> {
    // FAKE LOGIN
    if (email === 'getfootbally2026' && password === 'Osmantemur.2912') {
      localStorage.setItem(this.TOKEN_KEY, 'FAKE_ADMIN_TOKEN');
      return of(true);
    }

    return throwError(() => new Error('Invalid credentials'));
  }

  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }
}
