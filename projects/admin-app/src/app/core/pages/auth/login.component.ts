import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="login">
      <h2>Admin Login</h2>

      <input [(ngModel)]="email" placeholder="Email" />
      <input [(ngModel)]="password" type="password" placeholder="Password" />

      <button (click)="login()">Login</button>
    </div>
  `,
  styles: [`
    .login {
      height:100vh;
      display:flex;
      flex-direction:column;
      justify-content:center;
      align-items:center;
      gap:12px;
      background:#050814;
      color:white;
    }
    input { padding:10px; width:240px; }
    button { padding:10px 20px; cursor:pointer; }
  `],
})
export class LoginComponent {

  email = '';
  password = '';

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  login() {
    this.auth.login(this.email, this.password).subscribe(success => {
      if (success) {
        this.router.navigate(['/']);
      } else {
        alert('Login failed');
      }
    });
  }
}

