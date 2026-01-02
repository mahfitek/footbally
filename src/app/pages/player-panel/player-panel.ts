import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationService } from '../../services/application.service';

@Component({
  standalone: true,
  selector: 'app-player-panel',
  imports: [CommonModule],
  templateUrl: './player-panel.html',
  styleUrls: ['./player-panel.css']
})
export class PlayerPanelComponent {

  constructor(private applicationService: ApplicationService) {}

  apply() {
    this.applicationService.apply({
      playerId: Date.now(),
      position: 'Forvet',
      offeredPrice: 1200,
      status: 'pending'
    });
  }
}
