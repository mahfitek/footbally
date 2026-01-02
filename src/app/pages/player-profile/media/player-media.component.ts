import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface PlayerMediaItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  aiAnalyzed?: boolean;
}

@Component({
  selector: 'app-player-media',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './player-media.component.html',
  styleUrls: ['./player-media.component.css']
})
export class PlayerMediaComponent {
  @Input() isPremium = false;

  /** Demo medya – DB gelince burası direkt response olacak */
  media: PlayerMediaItem[] = [
    {
      id: '1',
      type: 'video',
      url: 'assets/videos/demo.mp4',
      aiAnalyzed: true
    },
    {
      id: '2',
      type: 'image',
      url: 'assets/images/demo.jpg'
    }
  ];

  /** Normal kullanıcı limiti */
  get visibleMedia(): PlayerMediaItem[] {
    return this.isPremium ? this.media : this.media.slice(0, 1);
  }
}
