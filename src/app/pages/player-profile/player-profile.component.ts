import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { PlayerHeroCardComponent } from './hero-card/player-hero-card.component';
import { PlayerRatingComponent } from './rating/player-rating.component';
import { PlayerMediaComponent } from './media/player-media.component';
import { PlayerMetaComponent } from './meta/player-meta.component';
import { PremiumAiPreviewComponent } from
  '../../shared/components/premium-lock/ai-preview/premium-ai-preview.component';

@Component({
  selector: 'app-player-profile',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    PlayerHeroCardComponent,
    PlayerRatingComponent,
    PlayerMediaComponent,
    PlayerMetaComponent,
    PremiumAiPreviewComponent
  ],
  templateUrl: './player-profile.component.html',
  styleUrls: ['./player-profile.component.css']
})
export class PlayerProfileComponent implements OnInit {

  isPremium = false;
  profileCompleted = false;

  // ===== PROGRESS =====
  profileProgress = 0;

  hasCv = false;
  hasPhoto = false;
  hasVideo = false;

  // ===== EDIT STATES =====
  isEditingProfile = false;
  isEditingCv = false;

  editBackup: any = null;

  cvText = '';

  // ===== APPLICATIONS =====
  applications: any[] = [];

  profile = {
    fullName: '',
    age: undefined as number | undefined,
    heightCm: undefined as number | undefined,
    weightKg: undefined as number | undefined,
    city: '',
    district: '',
    preferredFoot: '' as 'Sağ' | 'Sol' | 'Her İkisi' | '',
    positions: [] as string[],
    teamsPlayed: ''
  };

  positions = ['KALECİ', 'DEFANS', 'ORTA SAHA', 'FORVET'];
  footOptions = ['Sağ', 'Sol', 'Her İkisi'];

  cities: string[] = [];
  districts: string[] = [];
  locationMap: Record<string, string[]> = {};

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get<Record<string, string[]>>('/assets/data/tr-locations.json')
      .subscribe(data => {
        this.locationMap = data;
        this.cities = Object.keys(data);
      });

    // ===== LOAD APPLICATIONS =====
    const stored = localStorage.getItem('appliedAds');
    const raw = stored ? JSON.parse(stored) : [];

    // eski kayıtlar sadece id olabilir → güvenli map
    this.applications = raw.map((a: any) => {
      if (typeof a === 'number') {
        return {
          adId: a,
          teamName: 'Takım',
          date: '-',
          time: '-',
          field: '—',
          position: '—',
          status: 'Beklemede'
        };
      }

      return {
        ...a,
        status: 'Beklemede'
      };
    });
  }

  onCityChange() {
    this.districts = this.locationMap[this.profile.city] || [];
    this.profile.district = '';
  }

  togglePosition(pos: string) {
    if (this.profile.positions.includes(pos)) {
      this.profile.positions = this.profile.positions.filter(p => p !== pos);
    } else {
      this.profile.positions.push(pos);
    }
  }

  // ===== PROGRESS =====
  calculateProgress() {
    let progress = 60;
    if (this.hasCv) progress = 80;
    if (this.hasPhoto) progress = 90;
    if (this.hasVideo) progress = 100;
    this.profileProgress = progress;
  }

  saveProfile() {
    if (
      !this.profile.fullName ||
      !this.profile.age ||
      !this.profile.heightCm ||
      !this.profile.weightKg ||
      !this.profile.city ||
      !this.profile.district ||
      !this.profile.preferredFoot ||
      this.profile.positions.length === 0
    ) return;

    this.profileCompleted = true;
    this.calculateProgress();
  }

  // ===== PROFILE EDIT =====
  startEditProfile() {
    this.editBackup = JSON.parse(JSON.stringify(this.profile));
    this.isEditingProfile = true;
  }

  cancelEditProfile() {
    this.profile = JSON.parse(JSON.stringify(this.editBackup));
    this.isEditingProfile = false;
  }

  saveEditProfile() {
    this.isEditingProfile = false;
  }

  // ===== CV =====
  startEditCv() {
    this.isEditingCv = true;
  }

  saveCv() {
    if (this.cvText.trim().length > 0) {
      this.hasCv = true;
      this.calculateProgress();
    }
    this.isEditingCv = false;
  }

  cancelCv() {
    this.isEditingCv = false;
  }

  // ===== MEDIA TEMP =====
  addPhoto() { this.hasPhoto = true; this.calculateProgress(); }
  addVideo() { this.hasVideo = true; this.calculateProgress(); }
}
