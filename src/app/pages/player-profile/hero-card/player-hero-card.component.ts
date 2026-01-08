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

  /** Backend'den gelirse */
  @Input() profilePhotoUrl?: string;

  /** DEMO upload (refresh sonrası silinir) */
  tempPhotoPreviewUrl: string | null = null;
  photoPreviewUrl: string | null = null;

  /** Kulüp logosu */
  @Input() clubLogoUrl?: string;

  /** AI stat’ları */
  @Input() stats?: PlayerStats;

  promoComingSoon = true;

  getClubLogo(): string {
    return this.clubLogoUrl || 'assets/images/kulupsuz.png';
  }

  onPhotoSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || !input.files.length) return;

    const file = input.files[0];

    const reader = new FileReader();
    reader.onload = () => {
      this.tempPhotoPreviewUrl = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  savePhoto() {
    this.photoPreviewUrl = this.tempPhotoPreviewUrl;
    this.tempPhotoPreviewUrl = null;
  }

  /** Template'te tek noktadan okumak için */
  get activePhotoUrl(): string | null {
    return this.photoPreviewUrl || this.profilePhotoUrl || null;
  }
}
