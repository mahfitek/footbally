import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { PlayerHeroCardComponent } from './hero-card/player-hero-card.component';

@Component({
  selector: 'app-player-profile',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    PlayerHeroCardComponent
  ],
  templateUrl: './player-profile.component.html',
  styleUrls: ['./player-profile.component.css']
})
export class PlayerProfileComponent implements OnInit {

  // ===== USER =====
  isPremium = false;

  // ===== PROFILE STATE =====
  profileCompleted = false;
  isEditingProfile = false;

  // ===== CV =====
  hasCv = false;
  isEditingCv = false;
  cvText = '';

  // ===== MEDIA =====
  photos: { file: File; url: string }[] = [];
  videos: { file: File; url: string }[] = [];

  MAX_PHOTOS_LITE = 3;
  MAX_VIDEO_SIZE_MB = 50;

  editBackup: any = null;

  // ===== PROFILE MODEL =====
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

  // =========================
  // INIT
  // =========================
  ngOnInit(): void {

    this.http
      .get<Record<string, string[]>>('/assets/data/tr-locations.json')
      .subscribe(data => {
        this.locationMap = data;
        this.cities = Object.keys(data);
      });

    const storedProfile = localStorage.getItem('playerProfile');
    if (storedProfile) {
      try {
        const parsed = JSON.parse(storedProfile);

        this.profile = {
          ...parsed.profile,
          age: parsed.profile.age ?? undefined,
          heightCm: parsed.profile.heightCm ?? undefined,
          weightKg: parsed.profile.weightKg ?? undefined
        };

        this.cvText = parsed.cvText || '';
        this.hasCv = parsed.hasCv || false;
        this.photos = parsed.photos || [];
        this.videos = parsed.videos || [];
        this.profileCompleted = true;

      } catch (e) {
        console.warn('Profile parse error');
      }
    }
  }

  // =========================
  // LOCATION
  // =========================
  onCityChange() {
    this.districts = this.locationMap[this.profile.city] || [];
    this.profile.district = '';
  }

  // =========================
  // POSITIONS
  // =========================
  togglePosition(pos: string) {
    if (this.profile.positions.includes(pos)) {
      this.profile.positions = this.profile.positions.filter(p => p !== pos);
    } else {
      this.profile.positions.push(pos);
    }
  }

  // =========================
  // CREATE PROFILE
  // =========================
  startCreateProfile() {
    this.isEditingProfile = true;
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
    ) {
      alert('Lütfen tüm zorunlu alanları doldur');
      return;
    }

    this.profileCompleted = true;
    this.isEditingProfile = false;
    this.persistProfile();
  }

  // =========================
  // EDIT PROFILE
  // =========================
  startEditProfile() {
    this.editBackup = JSON.parse(JSON.stringify(this.profile));
    this.isEditingProfile = true;
    this.profileCompleted = false;
  }

  cancelEditProfile() {
    if (this.editBackup) {
      this.profile = JSON.parse(JSON.stringify(this.editBackup));
    }
    this.isEditingProfile = false;
    this.profileCompleted = true;
  }

  saveEditProfile() {
    this.isEditingProfile = false;
    this.profileCompleted = true;
    this.persistProfile();
  }

  // =========================
  // CV
  // =========================
  startEditCv() {
    this.isEditingCv = true;
  }

  saveCv() {
    if (this.cvText.trim().length > 0) {
      this.hasCv = true;
      this.persistProfile();
    }
    this.isEditingCv = false;
  }

  cancelCv() {
    this.isEditingCv = false;
  }

  // =========================
  // PHOTO UPLOAD
  // =========================
  onPhotoSelected(event: any) {
    const file: File = event.target.files[0];
    if (!file) return;

    if (!this.isPremium && this.photos.length >= this.MAX_PHOTOS_LITE) {
      alert('Ücretsiz üyelikte en fazla 3 fotoğraf yükleyebilirsin.');
      return;
    }

    const url = URL.createObjectURL(file);
    this.photos.push({ file, url });
  }

  savePhotos() {
    this.persistProfile();
    alert('Fotoğraflar kaydedildi ✅');
  }

  // =========================
  // VIDEO UPLOAD
  // =========================
  onVideoSelected(event: any) {
    const file: File = event.target.files[0];
    if (!file) return;

    const sizeMb = file.size / 1024 / 1024;

    if (!this.isPremium && this.videos.length >= 1) {
      alert('Ücretsiz üyelikte yalnızca 1 video yükleyebilirsin.');
      return;
    }

    if (sizeMb > this.MAX_VIDEO_SIZE_MB) {
      alert('Video boyutu 50MB üstü olamaz.');
      return;
    }

    const url = URL.createObjectURL(file);
    this.videos.push({ file, url });
  }

  saveVideos() {
    this.persistProfile();
    alert('Videolar kaydedildi ✅');
  }

  // =========================
  // LOCAL STORAGE SAVE
  // =========================
  persistProfile() {
    const payload = {
      profile: this.profile,
      hasCv: this.hasCv,
      cvText: this.cvText,
      photos: this.photos,
      videos: this.videos
    };
    localStorage.setItem('playerProfile', JSON.stringify(payload));
  }
}
