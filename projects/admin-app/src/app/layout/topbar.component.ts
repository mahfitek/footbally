import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-topbar',
  template: `
    <div class="topbar">
      <span>Admin Panel</span>
      <button (click)="logout()">Logout</button>
    </div>
  `,
  styles: [`
    .topbar {
      height:60px;
      background:#0b1020;
      color:white;
      display:flex;
      align-items:center;
      justify-content:space-between;
      padding:0 20px;
      border-bottom:1px solid rgba(255,255,255,0.05);
    }
    button {
      background:#ff4d4f;
      border:none;
      color:white;
      padding:6px 14px;
      cursor:pointer;
      border-radius:4px;
    }
  `]
})
export class TopbarComponent {

  constructor(private router: Router) {}

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
