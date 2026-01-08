import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

// PAGES
import { HomeComponent } from './pages/home/home';
import { PremiumComponent } from './pages/premium/premium';
import { LoginComponent } from './pages/login/login';

// PLAYER
import { PlayerComponent } from './pages/player/player';
import { PlayerDetailComponent } from './pages/player-detail/player-detail';
import { PlayerProfileComponent } from './pages/player-profile/player-profile.component';
import { PlayerPanelComponent } from './pages/player-panel/player-panel';

// TEAM
import { TeamComponent } from './pages/team/team';
import { TeamDetailComponent } from './pages/team-detail/team-detail';
import { TeamProfileComponent } from './pages/team-profile/team-profile';
import { TeamPanelComponent } from './pages/team-panel/team-panel';

// SUPPORT
import { SupportComponent } from './pages/support/support';

// CONTACT
import { ContactComponent } from './pages/contact/contact';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },

  // LOGIN (HER ZAMAN AÇIK)
  {
    path: 'login',
    component: LoginComponent
  },

  // PREMIUM
  {
    path: 'premium',
    component: PremiumComponent
  },

  // SUPPORT
  {
    path: 'support',
    component: SupportComponent
  },

  // CONTACT
  {
    path: 'contact',
    component: ContactComponent
  },

  // PLAYER
  {
    path: 'player',
    component: PlayerComponent
  },
  {
    path: 'player/:id',
    component: PlayerDetailComponent
  },
  {
    path: 'player-profile',
    component: PlayerProfileComponent,
    canActivate: [authGuard]
  },
  {
    path: 'player-panel',
    component: PlayerPanelComponent,
    canActivate: [authGuard]
  },

  // SCOUT
  {
    path: 'scout/player/:id',
    loadComponent: () =>
      import('./pages/scout-player/scout-player.component')
        .then(m => m.ScoutPlayerComponent),
    canActivate: [authGuard]
  },

  // TEAM
  {
    path: 'team',
    component: TeamComponent
  },
  {
    path: 'team/:id',
    component: TeamDetailComponent
  },
  {
    path: 'team-profile',
    component: TeamProfileComponent,
    canActivate: [authGuard]
  },
  {
    path: 'team-panel',
    component: TeamPanelComponent,
    canActivate: [authGuard]
  },

  // =========================
  // MATCHES
  // =========================

  // CREATE MATCH  ✅ COMPONENT
  {
    path: 'matches/create',
    loadComponent: () =>
      import('./components/create-match/create-match.component')
        .then(m => m.CreateMatchComponent),
    canActivate: [authGuard]
  },

  // MATCH LIST
  {
    path: 'matches',
    loadComponent: () =>
      import('./pages/matches/match-list/match-list.page')
        .then(m => m.MatchListPage),
  },

  // MATCH DETAIL
  {
    path: 'matches/:id',
    loadComponent: () =>
      import('./pages/matches/match-detail/match-detail.page')
        .then(m => m.MatchDetailPage),
  },

  // FALLBACK
  {
    path: '**',
    redirectTo: ''
  }
];
