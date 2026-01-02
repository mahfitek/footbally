import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-support',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './support.html',
  styleUrls: ['./support.css']
})
export class SupportComponent {

  showSuccessModal = false;

  form = {
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  };

  canSubmit(): boolean {
    return !!(
      this.form.fullName &&
      this.form.email &&
      this.form.subject &&
      this.form.message
    );
  }

  submitSupport() {
    if (!this.canSubmit()) return;

    // demo → backend sonra
    this.showSuccessModal = true;

    // reset
    this.form = {
      fullName: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    };
  }

  closeModal() {
    this.showSuccessModal = false;
  }
}
