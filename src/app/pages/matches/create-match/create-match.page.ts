import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-match',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-match.page.html',
  styleUrls: ['./create-match.page.css'],
})
export class CreateMatchPage {

  showSuccess = false;

  today = new Date().toISOString().split('T')[0]; // 🔥 min tarih için

  form = {
    location_name: '',
    city: '',
    district: '',
    match_date: '',
    match_time: '',
    required_players: 1,
    price_per_player: 0,
  };

  canPublish(): boolean {
    return !!(
      this.form.location_name &&
      this.form.city &&
      this.form.match_date &&
      this.form.match_time &&
      this.form.required_players > 0
    );
  }

  publish() {
    if (!this.canPublish()) return;

    console.log('Match published:', this.form);

    // 🔥 MODAL AÇ
    this.showSuccess = true;

    // 🔥 2.5 sn sonra otomatik kapan
    setTimeout(() => {
      this.closeModal();
    }, 2500);

    // reset
    this.form = {
      location_name: '',
      city: '',
      district: '',
      match_date: '',
      match_time: '',
      required_players: 1,
      price_per_player: 0,
    };
  }

  closeModal() {
    this.showSuccess = false;
  }
}
