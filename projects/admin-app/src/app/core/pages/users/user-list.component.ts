import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h1>Users</h1>

    <div class="toolbar">
      <input placeholder="Search..." [(ngModel)]="search"/>
      <select [(ngModel)]="filter">
        <option value="all">All</option>
        <option value="premium">Premium</option>
        <option value="banned">Banned</option>
      </select>
    </div>

    <div *ngIf="loading" class="loading">Loading users...</div>

    <table *ngIf="!loading">
      <tr>
        <th>ID</th><th>Name</th><th>Email</th><th>Status</th>
      </tr>

      <tr *ngFor="let u of users" class="row" (click)="goDetail(u.id)">
        <td>{{u.id}}</td>
        <td>{{u.name}}</td>
        <td>{{u.email}}</td>
        <td>{{u.status}}</td>
      </tr>
    </table>
  `,
  styles: [`
    .toolbar { display:flex; gap:12px; margin-bottom:12px; }
    input,select { background:#050814; color:white; border:none; padding:8px; border-radius:8px; }
    .row { cursor:pointer; }
    .row:hover { background:#141a3a; }
    .loading { opacity:.7; }
  `]
})
export class UserListComponent implements OnInit {

  constructor(private router: Router) {}

  loading = true;
  users: any[] = [];

  search = '';
  filter = 'all';

  ngOnInit() {
    // 🔥 UserAdminService buraya bağlanacak
    setTimeout(() => this.loading = false, 600);
  }

  goDetail(id:number){
    this.router.navigate(['/users', id]);
  }
}
