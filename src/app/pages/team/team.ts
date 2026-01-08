import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmptyStateComponent } from '../../empty-state/empty-state';
import { Router } from '@angular/router';

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [CommonModule, FormsModule, EmptyStateComponent],
  templateUrl: './team.html',
  styleUrls: ['./team.css'],
})
export class TeamComponent implements OnInit {

  constructor(private router: Router) {}

  isTeamPremium = false;

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
      activeAds: 2,
      lastOnlineMin: 12,
      isPremium: true
    },
    {
      id: 2,
      name: 'Bornova United',
      city: 'İzmir',
      district: 'Bornova',
      level: 'Amatör',
      rating: 4.2,
      matchesPlayed: 7,
      activeAds: 1,
      lastOnlineMin: 180,
      isPremium: false
    },
    {
      id: 3,
      name: 'Beşiktaş Kartalları',
      city: 'İstanbul',
      district: 'Beşiktaş',
      level: 'Yarı Pro',
      rating: 5.0,
      matchesPlayed: 31,
      activeAds: 3,
      lastOnlineMin: 5,
      isPremium: true
    }
  ];

  filteredTeams = [...this.teams];

  /* ================= FILTER STATE ================= */

  filters = {
    city: '',
    level: '',
    onlyPremium: false,
    minRating: 0,
    sort: ''
  };

  /* ================= APPLICATION STATE ================= */

  appliedTeams: number[] = [];

  /* ================= TOAST ================= */

  toastVisible = false;
  toastMessage = '';

  /* ================= INIT ================= */

  ngOnInit(): void {
    this.isTeamPremium = localStorage.getItem('team_premium') === 'true';

    const stored = localStorage.getItem('appliedTeams');
    this.appliedTeams = stored ? JSON.parse(stored) : [];

    this.applyFilters();
  }

  /* ================= FILTER LOGIC ================= */

  applyFilters() {
    let list = [...this.teams];

    if (this.filters.city)
      list = list.filter(t => t.city === this.filters.city);

    if (this.filters.level)
      list = list.filter(t => t.level === this.filters.level);

    if (this.isTeamPremium && this.filters.onlyPremium)
      list = list.filter(t => t.isPremium);

    if (this.isTeamPremium && this.filters.minRating > 0)
      list = list.filter(t => t.rating >= this.filters.minRating);

    /* ===== SORTING ===== */

    if (this.filters.sort === 'rating-desc') {
      list.sort((a, b) => b.rating - a.rating);
    }

    if (this.filters.sort === 'active') {
      // az dakika = daha aktif = üstte
      list.sort((a, b) => a.lastOnlineMin - b.lastOnlineMin);
    }

    this.filteredTeams = list;
  }

  /* ================= APPLY LOGIC ================= */

  isApplied(teamId: number): boolean {
    return this.appliedTeams.includes(teamId);
  }

  applyToTeam(team: any) {
    if (this.isApplied(team.id)) return;

    this.appliedTeams.push(team.id);
    localStorage.setItem('appliedTeams', JSON.stringify(this.appliedTeams));

    this.showToast('Başvurun gönderildi ✅');
  }

  /* ================= NAVIGATION ================= */

  goToTeamDetail(teamId: number) {
    this.router.navigate(['/team', teamId]);
  }

  /* ================= TOAST ================= */

  showToast(message: string) {
    this.toastMessage = message;
    this.toastVisible = true;

    setTimeout(() => {
      this.toastVisible = false;
    }, 2000);
  }

  /* ================= UI HELPERS ================= */

  formatLastOnline(min: number) {
    if (min < 10) return 'az önce';
    if (min < 60) return `${min} dk önce`;
    if (min < 1440) return `${Math.floor(min / 60)} saat önce`;
    return `${Math.floor(min / 1440)} gün önce`;
  }

}
