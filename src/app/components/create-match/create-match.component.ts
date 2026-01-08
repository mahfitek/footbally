import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-create-match',
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './create-match.component.html',
  styleUrls: ['./create-match.component.css']
})
export class CreateMatchComponent implements OnInit {

  cities: string[] = [];
  districts: string[] = [];
  locationMap: Record<string, string[]> = {};

  showSuccessModal = false;

  todayDate: string = '';
  minTime: string = '00:00';

  match = {
    date: '',
    time: '',
    location: '',
    city: '',
    district: '',
    fieldType: '',
    format: '',
    playersNeeded: null as number | null,
    price: null as number | null,
    travelCovered: false,
    foodCovered: false,
    neededPositions: [] as string[],
    description: ''
  };

  positions = ['Kaleci', 'Defans', 'Orta Saha', 'Kanat', 'Forvet'];

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {

    // 👉 BUGÜN TARİH (geçmiş gün seçilemez)
    const now = new Date();
    this.todayDate = now.toISOString().split('T')[0];

    // 👉 şehir / ilçe datası
    this.http
      .get<Record<string, string[]>>('/assets/data/tr-locations.json')
      .subscribe(data => {
        this.locationMap = data;
        this.cities = Object.keys(data);
      });
  }

  onCityChange() {
    this.districts = this.locationMap[this.match.city] || [];
    this.match.district = '';
  }

  // 👉 BUGÜN SEÇİLİYSE GEÇMİŞ SAATLER KAPALI
  onDateChange() {
    if (!this.match.date) return;

    const selected = new Date(this.match.date);
    const now = new Date();

    if (selected.toDateString() === now.toDateString()) {
      const h = now.getHours().toString().padStart(2, '0');
      const m = now.getMinutes().toString().padStart(2, '0');
      this.minTime = `${h}:${m}`;
    } else {
      this.minTime = '00:00';
    }
  }

  togglePosition(pos: string) {
    if (this.match.neededPositions.includes(pos)) {
      this.match.neededPositions =
        this.match.neededPositions.filter(p => p !== pos);
    } else {
      this.match.neededPositions.push(pos);
    }
  }

  createMatch() {

    // 👉 SON GÜVENLİK: geçmiş datetime engelle
    const matchDateTime = new Date(`${this.match.date}T${this.match.time}`);
    const now = new Date();

    if (!this.match.date || !this.match.time || matchDateTime <= now) {
      alert('Geçmiş saat için maç ilanı oluşturamazsın.');
      return;
    }

    // 👉 DEMO PREVIEW İÇİN KAYDET
    const preview = {
      city: this.match.city,
      district: this.match.district,
      date: this.match.date,
      time: this.match.time,
      fieldType: this.match.fieldType,
      format: this.match.format,
      neededPlayers: this.match.playersNeeded || 0,
      isFree: !this.match.price || this.match.price === 0,
      price: this.match.price,
      travelCovered: this.match.travelCovered,
      foodCovered: this.match.foodCovered
    };

    localStorage.setItem('demo_last_match', JSON.stringify(preview));

    // 👉 MODAL GÖSTER
    this.showSuccessModal = true;
  }

  closeModalAndGoProfile() {
    this.showSuccessModal = false;
    this.router.navigate(['/team-profile']);
  }
}
