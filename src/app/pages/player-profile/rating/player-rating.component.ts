import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface AiStats {
  hiz: number;
  sut: number;
  pas: number;
  dripling: number;
  defans: number;
  fizik: number;
}

@Component({
  selector: 'app-player-rating',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './player-rating.component.html',
  styleUrls: ['./player-rating.component.css']
})
export class PlayerRatingComponent {
  /** Premium durumu (backend’den gelecek) */
  @Input() isPremium = false;

  /** AI stat’ları (demo için dolu, DB’de response’tan gelecek) */
  @Input() stats: AiStats | null = {
    hiz: 82,
    sut: 85,
    pas: 74,
    dripling: 80,
    defans: 40,
    fizik: 76
  };

  /** Overall (hero card ile uyumlu) */
  get overall(): number {
    if (!this.stats) return 0;
    const v = Object.values(this.stats);
    return Math.round(v.reduce((a, b) => a + b, 0) / v.length);
  }
}
