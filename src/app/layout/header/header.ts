import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class HeaderComponent {

  isMobileMenuOpen = false;

  constructor(private router: Router) {}

  get isLoggedIn(): boolean {
    return !!localStorage.getItem('userRole');
  }

  get isPremium(): boolean {
    return false; // demo
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  goToProfile() {
    const role = localStorage.getItem('userRole');

    if (role === 'player') {
      this.router.navigate(['/player-profile']);
    }

    if (role === 'team') {
      this.router.navigate(['/team-profile']);
    }
  }

  logout() {
    localStorage.removeItem('userRole');
    this.router.navigate(['/']);
  }
}
