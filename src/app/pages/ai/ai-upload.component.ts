import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="ai-upload">

      <h1>AI Video Analysis</h1>
      <p>Maç içi videonu yükle, yapay zeka analiz etsin.</p>

      <input type="file" accept="video/*" (change)="onSelect($event)" />

      <div *ngIf="fileName" class="file-box">
        🎥 {{ fileName }}
      </div>

      <button
        class="start-btn"
        [disabled]="!fileName || loading"
        (click)="start()"
      >
        {{ loading ? 'Analyzing...' : 'Start Analysis' }}
      </button>

    </div>
  `,
  styles: [`
    .ai-upload {
      max-width:500px;
      margin:40px auto;
      background:#050814;
      padding:24px;
      border-radius:14px;
      text-align:center;
    }

    input { margin:20px 0; }

    .file-box {
      background:#0f1430;
      padding:10px;
      border-radius:8px;
      margin-bottom:16px;
    }

    .start-btn {
      background:#ffd666;
      border:none;
      padding:10px 20px;
      border-radius:10px;
      cursor:pointer;
      font-weight:600;
    }

    .start-btn:disabled {
      opacity:.5;
      cursor:not-allowed;
    }
  `]
})
export class AiUploadComponent {

  fileName: string | null = null;
  loading = false;

  constructor(private router: Router) {}

  onSelect(e: any) {
    const file = e.target.files[0];
    if (file) this.fileName = file.name;
  }

  start() {
    this.loading = true;

    // 🔥 MOCK AI PROCESS
    setTimeout(() => {
      this.router.navigate(['/ai/result']);
    }, 2000);
  }
}
