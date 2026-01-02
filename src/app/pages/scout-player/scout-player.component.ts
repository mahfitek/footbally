import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlayerHeroCardComponent } from '../player-profile/hero-card/player-hero-card.component';
import { PlayerRatingComponent } from '../player-profile/rating/player-rating.component';
import { PlayerMediaComponent } from '../player-profile/media/player-media.component';
import { PlayerMetaComponent } from '../player-profile/meta/player-meta.component';

import { ScoutActionsComponent } from './actions/scout-actions.component';
import { ContactModalComponent } from './contact-modal/contact-modal.component';

@Component({
  selector: 'app-scout-player',
  standalone: true,
  templateUrl: './scout-player.component.html',
  styleUrls: ['./scout-player.component.css'],
  imports: [
    CommonModule,
    PlayerHeroCardComponent,
    PlayerRatingComponent,
    PlayerMediaComponent,
    PlayerMetaComponent,
    ScoutActionsComponent,
    ContactModalComponent
  ]
})
export class ScoutPlayerComponent {


  /** Modal state */
  showContactModal = false;

  /** Demo profile – ileride API’den gelecek */
  profile = {
    fullName: 'Ahmet Yılmaz',
    positions: ['ST'],
    stats: {
      hiz: 82,
      sut: 85,
      pas: 74,
      dripling: 80,
      defans: 40,
      fizik: 76
    },
    meta: {
      age: 19,
      heightCm: 178,
      weightKg: 72,
      preferredFoot: 'Sağ' as 'Sağ' | 'Sol',
      city: 'İstanbul',
      country: 'Türkiye'
    }
  };

  /** Actions */
  openContactModal(): void {
    this.showContactModal = true;
  }

  closeContactModal(): void {
    this.showContactModal = false;
  }
}
