import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlayerHeroCardComponent } from './hero-card/player-hero-card.component';
import { PlayerRatingComponent } from './rating/player-rating.component';
import { PlayerMediaComponent } from './media/player-media.component';
import { PlayerMetaComponent } from './meta/player-meta.component';
import { PremiumBadgeComponent } from
  '../../components/premium-badge/premium-badge.component';



@Component({
  selector: 'app-player-profile',
  standalone: true,
  imports: [
    CommonModule,
    PlayerHeroCardComponent,
    PlayerRatingComponent,
    PlayerMediaComponent,
    PlayerMetaComponent
  ],
  templateUrl: './player-profile.component.html',
  styleUrls: ['./player-profile.component.css']
})
export class PlayerProfileComponent {
  isPremium = true;
/** 
 * DEMO DATA
 * Tasarım tamamlandığında kaldırılacak 
 */

  profile = {
    fullName: 'Ahmet Yılmaz',
    positions: ['ST'],
    city: 'İstanbul',
    district: 'Kadıköy'
  };
}
