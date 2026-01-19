import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

type JobStatus = 'queued' | 'running' | 'done' | 'failed';

interface AiJob {
  id: number;
  type: 'VideoAnalysis' | 'TrustScan' | 'Matching';
  user: string;
  status: JobStatus;
  progress: number | null;
  createdAt: string;
}

@Component({
  standalone: true,
  imports: [CommonModule],
  template: `
    <h1>AI Job Queue</h1>

    <div *ngIf="loading" class="loading">Loading jobs...</div>

    <table *ngIf="!loading">
      <tr>
        <th>ID</th>
        <th>Type</th>
        <th>User</th>
        <th>Status</th>
        <th>Progress</th>
        <th>Created</th>
        <th>Action</th>
      </tr>

      <tr *ngFor="let j of jobs">
        <td>#{{ j.id }}</td>
        <td>{{ j.type }}</td>
        <td>{{ j.user }}</td>

        <td>
          <span class="status"
            [class.q]="j.status==='queued'"
            [class.r]="j.status==='running'"
            [class.d]="j.status==='done'"
            [class.f]="j.status==='failed'">
            {{ j.status }}
          </span>
        </td>

        <td>
          <ng-container *ngIf="j.progress !== null; else dash">
            {{ j.progress }}%
          </ng-container>
          <ng-template #dash>–</ng-template>
        </td>

        <td>{{ j.createdAt }}</td>

        <td class="actions">
          <button *ngIf="j.status==='done'" (click)="view(j)">View</button>
          <button *ngIf="j.status==='failed'" (click)="retry(j)">Retry</button>
          <span *ngIf="j.status==='running'">Processing…</span>
        </td>
      </tr>
    </table>
  `,
  styles: [`
    h1 { margin-bottom:12px; }

    table {
      width:100%;
      border-collapse:collapse;
      background:#050814;
      border-radius:12px;
      overflow:hidden;
    }

    th, td {
      padding:12px;
      border-bottom:1px solid rgba(255,255,255,0.08);
      text-align:left;
    }

    .status {
      padding:4px 10px;
      border-radius:12px;
      font-size:12px;
      text-transform:uppercase;
    }

    .q { background:#6b5f2a; }
    .r { background:#1f3c88; }
    .d { background:#1e7f4f; }
    .f { background:#7f1e1e; }

    .actions {
      display:flex;
      gap:8px;
      align-items:center;
    }

    button {
      border:none;
      padding:6px 12px;
      border-radius:8px;
      background:#2d3b55;
      color:white;
      cursor:pointer;
      font-size:12px;
    }

    button:hover { background:#3f4f73; }

    .loading { opacity:.7; }
  `]
})
export class AiJobsComponent implements OnInit {

  constructor(private router: Router) {}

  loading = true;
  jobs: AiJob[] = [];

  ngOnInit() {
    // 🔥 BURASI SONRA BACKEND / AI JOB API'DEN DOLACAK

    setTimeout(() => {
      this.jobs = [
        { id:9012, type:'VideoAnalysis', user:'Ahmet', status:'running', progress:63, createdAt:'2m ago' },
        { id:9013, type:'TrustScan', user:'Mehmet', status:'queued', progress:null, createdAt:'5m ago' },
        { id:9014, type:'Matching', user:'Emre', status:'failed', progress:null, createdAt:'10m ago' },
        { id:9015, type:'VideoAnalysis', user:'Can', status:'done', progress:100, createdAt:'15m ago' },
      ];
      this.loading = false;
    }, 600);
  }

  view(job: AiJob) {
    this.router.navigate(['/ai-jobs', job.id]);
  }

  retry(job: AiJob) {
    job.status = 'running';
    job.progress = 10;

    const interval = setInterval(() => {
      if (job.progress! >= 100) {
        job.status = 'done';
        job.progress = 100;
        clearInterval(interval);
      } else {
        job.progress! += 20;
      }
    }, 600);
  }
}
