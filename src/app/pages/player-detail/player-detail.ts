import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-player-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './player-detail.html',
  styleUrl: './player-detail.css',
})
export class PlayerDetailComponent {
  playerId!: number;

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.playerId = +params['id'];
    });
  }
}
