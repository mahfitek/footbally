import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule],
  template: `
    <h1>Dashboard</h1>

    <div *ngIf="loading" class="loading">Loading dashboard...</div>

    <ng-container *ngIf="!loading">

      <div class="cards">
        <div class="card">
          <div class="label">Toplam Kullanıcı</div>
          <div class="value">{{ stats.totalUsers ?? '-' }}</div>
        </div>

        <div class="card">
          <div class="label">Toplam Takım</div>
          <div class="value">{{ stats.totalTeams ?? '-' }}</div>
        </div>

        <div class="card">
          <div class="label">Toplam Maç</div>
          <div class="value">{{ stats.totalMatches ?? '-' }}</div>
        </div>

        <div class="card">
          <div class="label">Bugün Açılan Maç</div>
          <div class="value">{{ stats.todayMatches ?? '-' }}</div>
        </div>
      </div>

      <div class="quick-stats">
        <div class="q-card">🔥 Bugün Premium: <b>{{ stats.todayPremium ?? '-' }}</b></div>
        <div class="q-card">⛔ Banlanan: <b>{{ stats.todayBanned ?? '-' }}</b></div>
        <div class="q-card">🚨 Açık Report: <b>{{ stats.openReports ?? '-' }}</b></div>
        <div class="q-card">⏳ Bekleyen: <b>{{ stats.pendingMatches ?? '-' }}</b></div>
      </div>

      <h2>Son Başvurular</h2>
      <div class="empty">Backend / AI agent bağlanacak</div>

      <h2>Son Admin Aksiyonları</h2>
      <div class="empty">Audit log servisi bekleniyor</div>

    </ng-container>
  `,
  styles: [`
    .loading { opacity:.7; }

    .cards {
      display:grid;
      grid-template-columns:repeat(auto-fit,minmax(200px,1fr));
      gap:16px;
    }

    .card {
      background:#0b0f1e;
      border-radius:14px;
      padding:16px;
      border:1px solid rgba(255,255,255,0.08);
    }

    .label { opacity:.7; font-size:14px; }
    .value { font-size:28px; font-weight:bold; }

    .quick-stats {
      display:grid;
      grid-template-columns:repeat(4,1fr);
      gap:14px;
      margin:20px 0;
    }

    .q-card {
      background:rgba(255,255,255,0.04);
      border:1px solid rgba(255,255,255,0.08);
      border-radius:12px;
      padding:14px;
      font-size:14px;
    }

    .empty {
      opacity:.5;
      padding:12px 0;
    }
  `]
})
export class DashboardComponent implements OnInit {

  loading = true;

  stats: any = {};

  ngOnInit() {
    // 🔥 burada ileride AI/AdminStatsService çağrılacak
    setTimeout(() => this.loading = false, 600);
  }
}
