import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LoginModalComponent } from '../../components/login-modal/login-modal';

@Component({
  selector: 'app-team-detail',
  standalone: true,
  imports: [CommonModule, LoginModalComponent],
  templateUrl: './team-detail.html',
  styleUrls: ['./team-detail.css'],
})
export class TeamDetailComponent {
  teamId!: string;
  showLogin = false;

  constructor(
    private route: ActivatedRoute,
    public auth: AuthService
  ) {
    this.teamId = this.route.snapshot.paramMap.get('id')!;
  }

  apply() {
    alert('Başvuru gönderildi');
  }

toggleFav() {
  if (!this.auth.isLoggedIn()) {
    this.showLogin = true;
    return;
  }
  alert('Favorilere eklendi ⭐');
} 
}
