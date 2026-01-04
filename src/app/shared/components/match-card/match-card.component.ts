import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

export interface MatchCardModel {
  id: string;
  location_name: string;
  city: string;
  district: string;
  match_date: string;
  match_time: string;
  required_players: number;
  price_per_player: number;
}

@Component({
  selector: 'app-match-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './match-card.component.html',
  styleUrls: ['./match-card.component.css'],
})
export class MatchCardComponent {
  @Input() match!: MatchCardModel;
}
