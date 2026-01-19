import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  template: `
    <nav class="sidebar">
      <h2>Footbally</h2>

      <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">
        Dashboard
      </a>

      <div class="menu-group">
        <div class="menu-title" (click)="usersOpen = !usersOpen">
          Users
          <span>{{ usersOpen ? '▾' : '▸' }}</span>
        </div>

        <div class="submenu" *ngIf="usersOpen">
          <a routerLink="/users" routerLinkActive="active">User List</a>
          <a routerLink="/premium" routerLinkActive="active">Premium</a>
          <a routerLink="/reports" routerLinkActive="active">Reports</a>
          <a routerLink="/ai-jobs" routerLinkActive="active">AI Jobs</a>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    .sidebar {
      width:220px;
      background:#050814;
      padding:20px;
      display:flex;
      flex-direction:column;
      gap:12px;
    }

    a { color:#aaa; text-decoration:none; padding:6px 8px; border-radius:8px; }
    a:hover { color:#fff; background:rgba(255,255,255,0.05); }
    .active { background:#7c5cff; color:white !important; }

    .menu-group { margin-top:10px; }

    .menu-title {
      cursor:pointer;
      color:#ddd;
      display:flex;
      justify-content:space-between;
      padding:6px 8px;
    }

    .submenu {
      display:flex;
      flex-direction:column;
      margin-left:10px;
      gap:4px;
    }
  `],
})
export class SidebarComponent {
  usersOpen = true;
}
