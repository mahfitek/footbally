import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './layout/admin-layout.component';
import { AuthGuard } from './core/guards/auth.guard';


export const routes: Routes = [

  {
    path: 'login',
    loadComponent: () =>
      import('./core/pages/auth/login.component')
        .then(m => m.LoginComponent),
  },

  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
   // ✅ FUNCTION GUARD
    children: [

      {
  path: 'ai-jobs',
  loadComponent: () =>
    import('./core/pages/ai/ai-jobs.component')
      .then(m => m.AiJobsComponent),
},

{
  path: 'ai-jobs/:id',
  loadComponent: () =>
    import('./core/pages/ai/ai-result.component')
      .then(m => m.AiResultComponent),
},


    {
  path: 'reports',
  loadComponent: () =>
    import('./core/pages/reports/report-list.component')
      .then(m => m.ReportListComponent),
},
{
  path: 'premium',
  loadComponent: () =>
    import('./core/pages/premium/premium-list.component')
      .then(m => m.PremiumListComponent),
},


      {
        path: '',
        loadComponent: () =>
          import('./core/pages/dashboard/dashboard.component')
            .then(m => m.DashboardComponent),
      },

      {
        path: 'users',
        loadComponent: () =>
          import('./core/pages/users/user-list.component')
            .then(m => m.UserListComponent),
      },

    ],
  },

  { path: '**', redirectTo: '' },
];
