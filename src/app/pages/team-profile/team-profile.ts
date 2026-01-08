import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TeamProfileService, TeamProfile } from '../../services/team-profile.service';

/* ===================== INTERFACES ===================== */

interface MatchPreview {
  city: string;
  district: string;
  date: string;
  time: string;
  fieldType: string;
  format: string;
  neededPlayers: number;
  price: number | null;
  travelCovered: boolean;
  foodCovered: boolean;
}

interface Formation {
  name: string;
  positions: string[];
}

interface PitchPos {
  x: number;
  y: number;
}

/* ===================== COMPONENT ===================== */

@Component({
  standalone: true,
  selector: 'app-team-profile',
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './team-profile.html',
  styleUrls: ['./team-profile.css']
})
export class TeamProfileComponent implements OnInit {

  profile!: TeamProfile;

  /* ===== LOCATION ===== */
  cities: string[] = [];
  districts: string[] = [];
  locationMap: Record<string, string[]> = {};

  /* ===== UI STATE ===== */
  submitted = false;
  hasTeamProfile = false;

  /* ===== MATCH PREVIEW ===== */
  matchPreview: MatchPreview | null = null;
  hasMatch = false;

  /* ===== FORMATIONS ===== */
  formats = ['5v5', '7v7', '8v8', '9v9', '10v10', '11v11'];
  selectedFormat = '';
  availableFormations: Formation[] = [];
  selectedFormation: Formation | null = null;
  formationPlayers: string[] = [];

  /* ===== PITCH ===== */
  pitchLayout: PitchPos[] = [];

  formationMap: Record<string, Formation[]> = {
    '5v5': [
      { name: '2-1-1', positions: ['GK', 'DEF', 'DEF', 'ST'] },
      { name: '1-2-1', positions: ['GK', 'DEF', 'MID', 'MID', 'ST'] }
    ],
    '7v7': [
      { name: '2-3-1', positions: ['GK','DEF','DEF','MID','MID','MID','ST'] },
      { name: '3-2-1', positions: ['GK','DEF','DEF','DEF','MID','MID','ST'] }
    ],
    '8v8': [
      { name: '3-3-1', positions: ['GK','DEF','DEF','DEF','MID','MID','MID','ST'] },
      { name: '2-3-2', positions: ['GK','DEF','DEF','MID','MID','MID','ST','ST'] }
    ],
    '9v9': [
      { name: '3-4-1', positions: ['GK','DEF','DEF','DEF','MID','MID','MID','MID','ST'] },
      { name: '4-3-1', positions: ['GK','DEF','DEF','DEF','DEF','MID','MID','MID','ST'] }
    ],
    '10v10': [
      { name: '4-4-1', positions: ['GK','DEF','DEF','DEF','DEF','MID','MID','MID','MID','ST'] },
      { name: '3-5-1', positions: ['GK','DEF','DEF','DEF','MID','MID','MID','MID','MID','ST'] }
    ],
    '11v11': [
      { name: '4-4-2', positions: ['GK','DEF','DEF','DEF','DEF','MID','MID','MID','MID','ST','ST'] },
      { name: '4-3-3', positions: ['GK','DEF','DEF','DEF','DEF','MID','MID','MID','LW','ST','RW'] },
      { name: '3-5-2', positions: ['GK','DEF','DEF','DEF','MID','MID','MID','MID','MID','ST','ST'] }
    ]
  };

  constructor(
    private teamProfileService: TeamProfileService,
    private router: Router,
    private http: HttpClient
  ) {
    this.profile = { ...this.teamProfileService.getProfile() };
    this.hasTeamProfile = !!this.profile.teamName;
  }

  /* ===================== INIT ===================== */

  ngOnInit(): void {

    // locations
    this.http
      .get<Record<string, string[]>>('/assets/data/tr-locations.json')
      .subscribe(data => {
        this.locationMap = data;
        this.cities = Object.keys(data);

        if (this.profile.city) {
          this.districts = this.locationMap[this.profile.city] || [];
        }
      });

    // match preview (demo)
    const lastMatchRaw = localStorage.getItem('demo_last_match');
    if (lastMatchRaw) {
      this.matchPreview = JSON.parse(lastMatchRaw);
      this.hasMatch = true;
    }
  }

  /* ===================== LOCATION ===================== */

  onCityChange() {
    this.districts = this.locationMap[this.profile.city] || [];
    this.profile.district = '';
  }

  /* ===================== TEAM ===================== */

  saveTeam() {
    this.submitted = true;

    if (!this.profile.teamName || !this.profile.city || !this.profile.district) {
      return;
    }

    this.teamProfileService.updateProfile({ ...this.profile });
    this.hasTeamProfile = true;
  }

  goToCreateMatch() {
    this.router.navigate(['/matches/create']);
  }

  /* ===================== FORMATION ===================== */

  onFormatChange() {
    this.availableFormations = this.formationMap[this.selectedFormat] || [];
    this.selectedFormation = null;
    this.formationPlayers = [];
    this.pitchLayout = [];
  }

  selectFormation(f: Formation) {
  this.selectedFormation = f;
  this.formationPlayers = new Array(f.positions.length).fill('');

  this.pitchPoints = this.pitchLayouts[f.name] || [];
}


  /* ===================== PITCH LAYOUT ===================== */

  generatePitchLayout(count: number): PitchPos[] {

    let rows: number[] = [];

    if (count <= 5) rows = [1, 2, 1, 1];
    else if (count <= 7) rows = [1, 3, 2, 1];
    else if (count <= 8) rows = [1, 3, 3, 1];
    else if (count <= 9) rows = [1, 4, 3, 1];
    else if (count <= 10) rows = [1, 4, 4, 1];
    else rows = [1, 4, 3, 3];

    const layout: PitchPos[] = [];
    const rowGap = 100 / (rows.length + 1);

    rows.forEach((playersInRow, rowIndex) => {

      const y = (rowIndex + 1) * rowGap;
      const colGap = 100 / (playersInRow + 1);

      for (let i = 0; i < playersInRow; i++) {
        layout.push({
          x: (i + 1) * colGap,
          y: y
        });
      }
    });

    return layout.slice(0, count);
  }
// =========================
// PITCH LAYOUTS (% based)
// =========================
pitchLayouts: Record<string, { x: number; y: number }[]> = {

  /* ===== 5v5 ===== */
  '2-1-1': [
    { x: 50, y: 90 }, // GK
    { x: 30, y: 65 }, { x: 70, y: 65 },
    { x: 50, y: 35 }
  ],

  '1-2-1': [
    { x: 50, y: 90 },
    { x: 35, y: 60 }, { x: 65, y: 60 },
    { x: 50, y: 30 }
  ],

  /* ===== 7v7 ===== */
  '2-3-1': [
    { x: 50, y: 90 },
    { x: 32, y: 68 }, { x: 68, y: 68 },
    { x: 25, y: 50 }, { x: 50, y: 50 }, { x: 75, y: 50 },
    { x: 50, y: 30 }
  ],

  '3-2-1': [
    { x: 50, y: 90 },
    { x: 28, y: 68 }, { x: 50, y: 68 }, { x: 72, y: 68 },
    { x: 38, y: 48 }, { x: 62, y: 48 },
    { x: 50, y: 28 }
  ],

  /* ===== 8v8 ===== */
  '3-3-1': [
    { x: 50, y: 90 },
    { x: 28, y: 70 }, { x: 50, y: 70 }, { x: 72, y: 70 },
    { x: 30, y: 50 }, { x: 50, y: 50 }, { x: 70, y: 50 },
    { x: 50, y: 28 }
  ],

  '2-3-2': [
    { x: 50, y: 90 },
    { x: 35, y: 70 }, { x: 65, y: 70 },
    { x: 28, y: 50 }, { x: 50, y: 50 }, { x: 72, y: 50 },
    { x: 40, y: 28 }, { x: 60, y: 28 }
  ],

  /* ===== 9v9 ===== */
  '3-4-1': [
    { x: 50, y: 90 },
    { x: 28, y: 72 }, { x: 50, y: 72 }, { x: 72, y: 72 },
    { x: 22, y: 52 }, { x: 40, y: 52 }, { x: 60, y: 52 }, { x: 78, y: 52 },
    { x: 50, y: 28 }
  ],

  '4-3-1': [
    { x: 50, y: 90 },
    { x: 22, y: 72 }, { x: 40, y: 72 }, { x: 60, y: 72 }, { x: 78, y: 72 },
    { x: 35, y: 52 }, { x: 50, y: 52 }, { x: 65, y: 52 },
    { x: 50, y: 28 }
  ],

  /* ===== 10v10 ===== */
  '4-4-1': [
    { x: 50, y: 90 },
    { x: 22, y: 75 }, { x: 40, y: 75 }, { x: 60, y: 75 }, { x: 78, y: 75 },
    { x: 22, y: 52 }, { x: 40, y: 52 }, { x: 60, y: 52 }, { x: 78, y: 52 },
    { x: 50, y: 28 }
  ],

  '3-5-1': [
    { x: 50, y: 90 },
    { x: 28, y: 75 }, { x: 50, y: 75 }, { x: 72, y: 75 },
    { x: 18, y: 52 }, { x: 34, y: 52 }, { x: 50, y: 50 }, { x: 66, y: 52 }, { x: 82, y: 52 },
    { x: 50, y: 28 }
  ],

  /* ===== 11v11 ===== */
  '4-4-2': [
    { x: 50, y: 90 },
    { x: 18, y: 75 }, { x: 38, y: 75 }, { x: 62, y: 75 }, { x: 82, y: 75 },
    { x: 18, y: 52 }, { x: 38, y: 52 }, { x: 62, y: 52 }, { x: 82, y: 52 },
    { x: 40, y: 28 }, { x: 60, y: 28 }
  ],

  '4-3-3': [
    { x: 50, y: 90 },
    { x: 18, y: 75 }, { x: 38, y: 75 }, { x: 62, y: 75 }, { x: 82, y: 75 },
    { x: 38, y: 52 }, { x: 50, y: 50 }, { x: 62, y: 52 },
    { x: 22, y: 26 }, { x: 50, y: 22 }, { x: 78, y: 26 }
  ],

  '3-5-2': [
    { x: 50, y: 90 },
    { x: 28, y: 75 }, { x: 50, y: 75 }, { x: 72, y: 75 },
    { x: 15, y: 52 }, { x: 32, y: 52 }, { x: 50, y: 50 }, { x: 68, y: 52 }, { x: 85, y: 52 },
    { x: 40, y: 28 }, { x: 60, y: 28 }
  ]
};



pitchPoints: { x: number; y: number }[] = [];

}
