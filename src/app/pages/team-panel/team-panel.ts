import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApplicationService, Application } 
  from '../../services/application.service';

import { PlayerProfileService, PlayerProfile } 
  from '../../services/player-profile.service';

import { PlayerProfileModalComponent } 
  from '../../components/player-profile-modal/player-profile-modal';

@Component({
  selector: 'app-team-panel',
  standalone: true,
  imports: [
    CommonModule,
    PlayerProfileModalComponent
  ],
  templateUrl: './team-panel.html',
  styleUrls: ['./team-panel.css'], // ❗️ styleUrl DEĞİL
})
export class TeamPanelComponent implements OnInit {

  listings: {
    title: string;
    position: string;
    applicants: Application[];
  }[] = [];

  selectedPlayer?: PlayerProfile;

  constructor(
    private applicationService: ApplicationService,
    private playerProfileService: PlayerProfileService
  ) {}

  ngOnInit(): void {
    this.listings = [
      {
        title: 'Açık Maç İlanı',
        position: 'Forvet',
        applicants: this.applicationService.getApplications()
      }
    ];
  }

  accept(a: Application) {
    this.applicationService.updateStatus(a, 'accepted');
  }

  pay(a: Application) {
    this.applicationService.updateStatus(a, 'paid');
  }

  completeMatch(a: Application) {
    this.applicationService.updateStatus(a, 'completed');
  }

  ratePlayer(a: Application) {
    // ileride rating modal açılacak
    console.log('Rate player:', a.playerId);
  }

  openPlayer(playerId: number) {
    this.selectedPlayer = this.playerProfileService.getById(playerId);
  }

  closePlayer() {
    this.selectedPlayer = undefined;
  }
}
