import { Injectable } from '@angular/core';

export interface TeamProfile {
  teamName: string;
  city: string;
  district: string;
  leagueLevel: string;
  neededPositions: string[];
  budgetMin: number | null;
  budgetMax: number | null;
  description: string;
}

@Injectable({ providedIn: 'root' })
export class TeamProfileService {

  private profile: TeamProfile = {
    teamName: '',
    city: '',
    district: '',
    leagueLevel: '',
    neededPositions: [],
    budgetMin: null,
    budgetMax: null,
    description: ''
  };

  getProfile(): TeamProfile {
    return this.profile;
  }

  updateProfile(data: TeamProfile) {
    this.profile = data;
  }
}
