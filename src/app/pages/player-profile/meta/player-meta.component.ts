import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface PlayerMeta {
  age?: number;
  heightCm?: number;
  weightKg?: number;
  preferredFoot?: 'Sağ' | 'Sol';
  city?: string;
  country?: string;
}

@Component({
  selector: 'app-player-meta',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './player-meta.component.html',
  styleUrls: ['./player-meta.component.css']
})
export class PlayerMetaComponent {
  @Input() meta!: PlayerMeta;
}
