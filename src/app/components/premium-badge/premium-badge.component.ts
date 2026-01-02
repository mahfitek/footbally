import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type PremiumBadgeType =
  | 'premium'
  | 'ai'
  | 'scout'
  | 'pro'
  | 'coming-soon';

@Component({
  selector: 'app-premium-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span class="badge" [attr.data-type]="type">
      <ng-container [ngSwitch]="type">
        <span *ngSwitchCase="'premium'">PREMIUM</span>
        <span *ngSwitchCase="'ai'">AI ANALYZED</span>
        <span *ngSwitchCase="'scout'">SCOUT READY</span>
        <span *ngSwitchCase="'pro'">PRO PROFILE</span>
        <span *ngSwitchCase="'coming-soon'">COMING SOON</span>
      </ng-container>
    </span>
  `,
  styleUrls: ['./premium-badge.component.css']
})

export class PremiumBadgeComponent {
  @Input() type: PremiumBadgeType = 'premium';
}
