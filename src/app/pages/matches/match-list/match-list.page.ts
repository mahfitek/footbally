import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatchCardComponent } from '../../../shared/components/match-card/match-card.component';


interface Match {
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
  selector: 'app-match-list',
  standalone: true,
  imports: [CommonModule, RouterModule, MatchCardComponent],
  templateUrl: './match-list.page.html',
  styleUrls: ['./match-list.page.css'],
})
export class MatchListPage {

  matches: Match[] = [
    {
      id: '1',
      location_name: 'XYZ Halı Saha',
      city: 'İstanbul',
      district: 'Kadıköy',
      match_date: '2026-02-15',
      match_time: '21:00',
      required_players: 2,
      price_per_player: 500,
    },
    {
      id: '2',
      location_name: 'Arena Halı Saha',
      city: 'İstanbul',
      district: 'Beşiktaş',
      match_date: '2026-02-15',
      match_time: '22:00',
      required_players: 1,
      price_per_player: 0,
    },
  ];
}
