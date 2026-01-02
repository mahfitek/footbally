import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface PlayerProfile {
  fullName: string;
  positions: string[];
  city?: string;
  district?: string;
}

@Component({
  selector: 'app-player-profile-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './player-profile-modal.html',
  styleUrls: ['./player-profile-modal.css']
})
export class PlayerProfileModalComponent {
  @Input() profile!: PlayerProfile;
}
