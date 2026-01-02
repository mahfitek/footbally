import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './empty-state.html',
  styleUrls: ['./empty-state.css'],
})
export class EmptyStateComponent {
  @Input() title = '';
  @Input() description = '';
  @Input() actionText = '';
}
