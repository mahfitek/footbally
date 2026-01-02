import { Injectable } from '@angular/core';

export type ApplicationStatus =
  | 'pending'
  | 'accepted'
  | 'paid'
  | 'completed';

export interface Application {
  playerId: number;
  position: string;
  offeredPrice: number;
  status: ApplicationStatus;
}

@Injectable({ providedIn: 'root' })
export class ApplicationService {

  private applications: Application[] = [];

  /** Player başvuru yapar */
  apply(app: Application) {
    this.applications.push({
      ...app,
      status: 'pending'
    });
  }

  /** Team & Player panelleri okur */
  getApplications(): Application[] {
    return this.applications;
  }

  /** Team aksiyonları */
  updateStatus(app: Application, status: ApplicationStatus) {
    const found = this.applications.find(
      a => a.playerId === app.playerId
    );
    if (found) {
      found.status = status;
    }
  }
}
