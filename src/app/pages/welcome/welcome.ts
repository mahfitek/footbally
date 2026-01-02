import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './welcome.html',
  styleUrls: ['./welcome.css'],
})
export class WelcomeComponent {
  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  finish() {
    localStorage.setItem('onboarded', 'true');
    this.router.navigateByUrl('/');
  }
}
