import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type CardTier = 'bronze' | 'silver' | 'gold' | 'rare-gold';

export interface PlayerStats {
  hiz: number;
  sut: number;
  pas: number;
  dripling: number;
  defans: number;
  fizik: number;
}

@Component({
  selector: 'app-player-hero-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './player-hero-card.component.html',
  styleUrls: ['./player-hero-card.component.css']
})
export class PlayerHeroCardComponent {
  @Input() fullName!: string;
  @Input() position!: string;
  @Input() rating!: number;
  @Input() cardTier!: CardTier;
  @Input() referencePlayer?: string;
  @Input() isPremium = false;

  /** Kulüp logosu varsa gelir, yoksa kulüpsüz gösterilir */
  @Input() clubLogoUrl?: string;

  /** AI stat’ları */
  @Input() stats?: PlayerStats;

  /** Roadmap */
  promoComingSoon = true;

  getClubLogo(): string {
    return this.clubLogoUrl || 'assets/images/kulupsuz.png';
  }
}
