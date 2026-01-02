import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TeamProfileService, TeamProfile } from '../../services/team-profile.service';

@Component({
  standalone: true,
  selector: 'app-team-profile',
  imports: [CommonModule, FormsModule],
  templateUrl: './team-profile.html',
  styleUrls: ['./team-profile.css']
})
export class TeamProfileComponent {

  profile!: TeamProfile;

  positions = [
    'Kaleci',
    'Defans',
    'Orta Saha',
    'Kanat',
    'Forvet'
  ];

  constructor(private teamProfileService: TeamProfileService) {
    this.profile = { ...this.teamProfileService.getProfile() };
  }

  togglePosition(pos: string) {
    if (this.profile.neededPositions.includes(pos)) {
      this.profile.neededPositions =
        this.profile.neededPositions.filter(p => p !== pos);
    } else {
      this.profile.neededPositions.push(pos);
    }
  }

  save() {
    this.teamProfileService.updateProfile({ ...this.profile });
    alert('Takım profili kaydedildi');
  }
}
