import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-team-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './team-detail.html',
  styleUrls: ['./team-detail.css'],
})
export class TeamDetailComponent implements OnInit {

  teamId!: number;
  team: any = null;

  appliedAds: number[] = [];

  /* ================= FAKE TEAM DATA ================= */

  teams = [
    {
      id: 1,
      name: 'Kadıköy FC',
      city: 'İstanbul',
      district: 'Kadıköy',
      level: 'Orta',
      rating: 4.9,
      matchesPlayed: 18,
      lastOnlineMin: 12,
      isPremium: true,
      ads: [
        {
          id: 101,
          date: 'Bugün',
          time: '21:00',
          field: 'Kadıköy Halı Saha',
          neededPosition: 'Forvet'
        },
        {
          id: 102,
          date: 'Yarın',
          time: '22:00',
          field: 'Moda Arena',
          neededPosition: 'Defans'
        }
      ]
    },
    {
      id: 2,
      name: 'Bornova United',
      city: 'İzmir',
      district: 'Bornova',
      level: 'Amatör',
      rating: 4.2,
      matchesPlayed: 7,
      lastOnlineMin: 180,
      isPremium: false,
      ads: [
        {
          id: 201,
          date: 'Cumartesi',
          time: '20:00',
          field: 'Bornova Spor Tesisleri',
          neededPosition: 'Orta Saha'
        }
      ]
    },
    {
      id: 3,
      name: 'Beşiktaş Kartalları',
      city: 'İstanbul',
      district: 'Beşiktaş',
      level: 'Yarı Pro',
      rating: 5.0,
      matchesPlayed: 31,
      lastOnlineMin: 5,
      isPremium: true,
      ads: [
        {
          id: 301,
          date: 'Bugün',
          time: '23:00',
          field: 'Fulya Arena',
          neededPosition: 'Kaleci'
        },
        {
          id: 302,
          date: 'Pazar',
          time: '19:00',
          field: 'Beşiktaş Halı Saha',
          neededPosition: 'Forvet'
        },
        {
          id: 303,
          date: 'Pazartesi',
          time: '22:00',
          field: 'Ortaköy Arena',
          neededPosition: 'Defans'
        }
      ]
    }
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.teamId = Number(this.route.snapshot.paramMap.get('id'));
    this.team = this.teams.find(t => t.id === this.teamId);

    const stored = localStorage.getItem('appliedAds');
    this.appliedAds = stored ? JSON.parse(stored) : [];
  }

  /* ================= APPLY LOGIC ================= */

  isAdApplied(adId: number): boolean {
    return this.appliedAds.includes(adId);
  }

  applyToAd(ad: any) {
    if (this.isAdApplied(ad.id)) return;

    this.appliedAds.push(ad.id);
    localStorage.setItem('appliedAds', JSON.stringify(this.appliedAds));
  }

}
