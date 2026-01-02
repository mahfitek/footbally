import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-scout-actions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './scout-actions.component.html',
  styleUrls: ['./scout-actions.component.css']
})
export class ScoutActionsComponent {
  notificationsEnabled = false;

  @Output() contactClick = new EventEmitter<void>();

  toggleNotifications() {
    this.notificationsEnabled = !this.notificationsEnabled;
  }
}
