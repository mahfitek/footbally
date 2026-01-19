import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule],
  template: `
    <h1>AI Analysis Result</h1>
    <p class="job">Job #{{ jobId }}</p>

    <div class="grid">

      <!-- PLAYER CARD -->
      <div class="card player-card">
        <div class="overall">82</div>
        <div class="name">Ahmet Yılmaz</div>
        <div class="pos">ST</div>

        <div class="stats">
          <div>PAC <b>84</b></div>
          <div>SHO <b>78</b></div>
          <div>PAS <b>66</b></div>
          <div>DRI <b>80</b></div>
          <div>DEF <b>42</b></div>
          <div>PHY <b>71</b></div>
        </div>
      </div>

      <!-- BREAKDOWN -->
      <div class="card">
        <h3>Skill Breakdown</h3>
        <p>Shooting Accuracy: 0.78</p>
        <p>Sprint Speed: 0.86</p>
        <p>Pass Success: 0.64</p>
        <p>Dribble Control: 0.81</p>
      </div>

      <!-- ELITE COMPARISON -->
      <div class="card">
        <h3>Elite Comparison</h3>
        <p>Mbappe Similarity: <b>72%</b></p>
        <p>Vinicius Similarity: <b>64%</b></p>
        <p>Haaland Similarity: <b>58%</b></p>
      </div>

      <!-- TRUST SCORE -->
      <div class="card full">
        <h3>Trust & Data Quality</h3>
        <p>Video Quality: Good</p>
        <p>Pose Detection: High</p>
        <p>Frame Consistency: Medium</p>
        <p><b>Trust Score:</b> 0.81</p>
      </div>

    </div>
  `,
  styles: [`
    h1 { margin-bottom:4px; }
    .job { opacity:.6; margin-bottom:14px; }

    .grid {
      display:grid;
      grid-template-columns:repeat(3,1fr);
      gap:16px;
    }

    .card {
      background:#050814;
      border-radius:14px;
      padding:14px;
      border:1px solid rgba(255,255,255,0.08);
    }

    .full { grid-column: span 3; }

    /* PLAYER CARD */
    .player-card {
      background:linear-gradient(160deg,#1a1f44,#050814);
      text-align:center;
      position:relative;
    }

    .overall {
      font-size:46px;
      font-weight:800;
      color:#ffd666;
    }

    .name { margin-top:4px; font-weight:600; }
    .pos { opacity:.6; margin-bottom:10px; }

    .stats {
      display:grid;
      grid-template-columns:1fr 1fr;
      gap:6px;
      margin-top:10px;
      font-size:13px;
    }
  `]
})
export class AiResultComponent {

  jobId: string | null = null;

  constructor(route: ActivatedRoute) {
    this.jobId = route.snapshot.paramMap.get('id');
  }
}
