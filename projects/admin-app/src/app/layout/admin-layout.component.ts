import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './sidebar.component';
import { TopbarComponent } from './topbar.component';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, TopbarComponent],
  template: `
    <div class="layout">
      <app-sidebar></app-sidebar>

      <div class="content">
        <app-topbar></app-topbar>

        <div class="page">
          <router-outlet></router-outlet>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .layout {
      display:flex;
      height:100vh;
      background:#0b0f19;
      color:white;
    }

    .content {
      flex:1;
      display:flex;
      flex-direction:column;
      overflow:hidden;
    }

    .page {
      flex:1;
      padding:24px;
      overflow:auto;
      background:#0b0f19;
    }
  `],
})
export class AdminLayoutComponent {}
