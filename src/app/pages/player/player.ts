import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmptyStateComponent } from '../../empty-state/empty-state';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [CommonModule, EmptyStateComponent],
  templateUrl: './player.html',
  styleUrls: ['./player.css'],
})
export class PlayerComponent {
  listings: any[] = [];
}
