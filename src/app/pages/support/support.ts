import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-support',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './support.html',
  styleUrls: ['./support.css'],
})
export class SupportComponent {
  showSuccessModal = false;
  loading = false;
  errorMessage = '';

  form = {
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
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
    if (!this.canSubmit() || this.loading) return;

    this.loading = true;
    this.errorMessage = '';

    fetch('https://formspree.io/f/meeoraar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        type: 'support',
        fullName: this.form.fullName,
        email: this.form.email,
        phone: this.form.phone,
        subject: this.form.subject,
        message: this.form.message,
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error('failed');
        return res.json();
      })
      .then(() => {
        this.showSuccessModal = true;
        this.resetForm();
      })
      .catch(() => {
        this.errorMessage = 'Destek mesajı gönderilemedi.';
      })
      .finally(() => {
        this.loading = false;
      });
  }

  closeModal() {
    this.showSuccessModal = false;
  }

  private resetForm() {
    this.form = {
      fullName: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    };
  }
}
