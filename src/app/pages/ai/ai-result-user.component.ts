import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="ai-result">

      <h1>AI Performans Analizi</h1>

      <div class="card">
        <div class="rating">{{ rating }}</div>
        <p>{{ headline }}</p>
        <small>{{ compareText }}</small>
      </div>

      <ul>
        <li *ngFor="let f of feedback">• {{ f }}</li>
      </ul>

      <button (click)="back()">Profile Dön</button>

    </div>
  `,
  styles: [`
    .ai-result {
      max-width:500px;
      margin:40px auto;
      background:#050814;
      padding:24px;
      border-radius:14px;
      text-align:center;
    }

    .card {
      background:#0f1430;
      border-radius:12px;
      padding:20px;
      margin:20px 0;
    }

    .rating {
      font-size:48px;
      color:#ffd666;
      font-weight:700;
    }

    ul { list-style:none; padding:0; text-align:left; }
    li { margin:8px 0; }

    button {
      margin-top:16px;
      background:#ffd666;
      border:none;
      padding:10px 20px;
      border-radius:10px;
      cursor:pointer;
      font-weight:600;
    }
  `]
})
export class AiResultUserComponent implements OnInit {

  rating = 0;
  headline = '';
  compareText = '';
  feedback: string[] = [];

  ngOnInit() {
    // 🔥 GERÇEKÇİ MOCK AI

    this.rating = this.random(45, 92);

    if (this.rating < 60) {
      this.headline = 'Gelişime Açık Performans';
      this.compareText = 'Temel seviyede oyun profili';
      this.feedback = [
        'Pozisyon alma konusunda eksikler var.',
        'Top kontrolü istikrarsız.',
        'Sprint başlangıçları yavaş.',
        'Karar verme süresi uzun.'
      ];
    }

    else if (this.rating < 75) {
      this.headline = 'Ortalama Seviye Oyuncu';
      this.compareText = 'Amatör lig standardı';
      this.feedback = [
        'Pas tercihleri genel olarak doğru.',
        'Savunma dönüşleri yetersiz kalabiliyor.',
        'Şut kalitesi dalgalı.',
        'Tempo yükseldiğinde performans düşüyor.'
      ];
    }

    else if (this.rating < 90) {
      this.headline = 'İyi Performans';
      this.compareText = 'Yarı profesyonel seviyeye yakın';
      this.feedback = [
        'Hızlı karar verme yeteneği güçlü.',
        'Topla dripling sırasında dengeli.',
        'Doğru koşu zamanlamaları var.',
        'Bitiricilik geliştirilebilir.'
      ];
    }

    else {
      this.headline = 'Elit Oyuncu Potansiyeli';
      this.compareText = 'Üst seviye oyuncularla benzer profil';
      this.feedback = [
        'Üst düzey hızlanma kapasitesi.',
        'Pozisyon sezgisi çok güçlü.',
        'Yüksek oyun temposuna uyumlu.',
        'Profesyonel seviyeye uygun profil.'
      ];
    }
  }

  random(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  back() {
    this.router.navigate(['/player-profile']);
  }

  constructor(private router: Router) {}
}
