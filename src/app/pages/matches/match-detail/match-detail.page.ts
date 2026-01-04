import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-match-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './match-detail.page.html',
  styleUrls: ['./match-detail.page.css'],
})
export class MatchDetailPage {

  applied = false;

  match = {
    id: '',
    location_name: 'XYZ Halı Saha',
    city: 'İstanbul',
    district: 'Kadıköy',
    match_date: '2026-02-15',
    match_time: '21:00',
    required_players: 2,
    price_per_player: 500,
  };

  constructor(private route: ActivatedRoute) {
    this.match.id = this.route.snapshot.paramMap.get('id') || '';
  }

  apply() {
    this.applied = true;
  }
}
