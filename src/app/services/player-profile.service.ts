import { Injectable } from '@angular/core';

export interface PlayerProfile {
  id: number;

  fullName: string;
  age: number;

  city: string;
  district: string;

  /** Oynayabildiği mevkiler */
  positions: string[];

  bio: string;

  /** ⭐ Ortalama puan (0–5 veya 0–100 ileride genişler) */
  rating: number;
}

@Injectable({ providedIn: 'root' })
export class PlayerProfileService {

  private profile: PlayerProfile = {
    id: 1,
    fullName: '',
    age: 18,
    city: '',
    district: '',
    positions: [],
    bio: '',
    rating: 0
  };

  getProfile(): PlayerProfile {
    return this.profile;
  }

  updateProfile(profile: PlayerProfile): void {
    this.profile = { ...profile };
  }

  getById(id: number): PlayerProfile | undefined {
    return this.profile.id === id ? this.profile : undefined;
  }

  updateRating(newRating: number): void {
    this.profile.rating = newRating;
  }
}
