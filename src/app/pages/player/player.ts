import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Player {
  id: number;
  name: string;
  position: string;
  city: string;
  district: string;
  score: number;   // ⭐ maç sonu puanı (0–5)
  price: number;
  isPremium: boolean;
  lastActive: string;
}

@Component({
  standalone: true,
  selector: 'app-player',
  imports: [CommonModule, FormsModule],
  templateUrl: './player.html',
  styleUrls: ['./player.css']
})
export class PlayerComponent implements OnInit {

  isTeamPremium = false;

  allPlayers: Player[] = [];
  filteredPlayers: Player[] = [];

  filter = {
    premiumOnly: false,
    position: '',
    city: '',
    district: '',
    minScore: 0,
    sort: 'lastActive'
  };

  cities = ['İstanbul', 'Ankara', 'İzmir'];
  districtsMap: Record<string, string[]> = {
    İstanbul: ['Kadıköy', 'Beşiktaş'],
    Ankara: ['Çankaya', 'Keçiören'],
    İzmir: ['Bornova', 'Karşıyaka']
  };
  districts: string[] = [];

  ngOnInit(): void {
    this.isTeamPremium = localStorage.getItem('is_team_premium') === 'true';

    // ✅ FAKE DATA (MAÇ SONU PUANI VAR)
    this.allPlayers = [
      { id:1, name:'Osman', position:'DEF', city:'İstanbul', district:'Kadıköy', score:5.0, price:0, isPremium:false, lastActive:'2026-01-08T10:00' },
      { id:2, name:'Abdullah Karçekili', position:'MID', city:'İstanbul', district:'Beşiktaş', score:4.8, price:150, isPremium:true, lastActive:'2026-01-08T12:30' },
      { id:3, name:'Mert', position:'ST', city:'Ankara', district:'Çankaya', score:4.9, price:200, isPremium:true, lastActive:'2026-01-07T21:00' },
      { id:4, name:'Can', position:'GK', city:'İzmir', district:'Bornova', score:4.2, price:0, isPremium:false, lastActive:'2026-01-06T18:00' },
      { id:5, name:'Emre', position:'WING', city:'İstanbul', district:'Kadıköy', score:4.8, price:100, isPremium:false, lastActive:'2026-01-08T14:00' },
    ];

    this.applyFilters();
  }

  onCityChange() {
    this.districts = this.districtsMap[this.filter.city] || [];
    this.filter.district = '';
    this.applyFilters();
  }

  applyFilters() {
    let list = [...this.allPlayers];

    if (this.filter.premiumOnly && this.isTeamPremium) {
      list = list.filter(p => p.isPremium);
    }

    if (this.filter.position) {
      list = list.filter(p => p.position === this.filter.position);
    }

    if (this.filter.city) {
      list = list.filter(p => p.city === this.filter.city);
    }

    if (this.filter.district) {
      list = list.filter(p => p.district === this.filter.district);
    }

    if (this.isTeamPremium && this.filter.minScore > 0) {
      list = list.filter(p => p.score >= this.filter.minScore);
    }

    // ✅ SORTING
    switch (this.filter.sort) {
      case 'scoreDesc':
        list.sort((a,b)=>b.score-a.score);
        break;
      case 'scoreAsc':
        list.sort((a,b)=>a.score-b.score);
        break;
      case 'priceAsc':
        list.sort((a,b)=>a.price-b.price);
        break;
      case 'priceDesc':
        list.sort((a,b)=>b.price-a.price);
        break;
      default:
        list.sort((a,b)=>new Date(b.lastActive).getTime()-new Date(a.lastActive).getTime());
    }

    this.filteredPlayers = list;
  }

  quickInvite(p: Player) {
    alert(p.name + ' hızlı davet gönderildi (demo)');
  }
}
