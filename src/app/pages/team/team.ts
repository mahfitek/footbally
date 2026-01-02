import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmptyStateComponent } from '../../empty-state/empty-state';

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [CommonModule, EmptyStateComponent],
  templateUrl: './team.html',
  styleUrls: ['./team.css'],
})
export class TeamComponent {
  listings: any[] = [];
}
