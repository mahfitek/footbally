import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login-modal.html',
  styleUrls: ['./login-modal.css']
})
export class LoginModalComponent {
  @Output() close = new EventEmitter<void>();
  @Output() login = new EventEmitter<'player' | 'team'>();

  selectedRole: 'player' | 'team' | null = null;

  submit() {
    if (!this.selectedRole) return;
    this.login.emit(this.selectedRole);
  }
}
