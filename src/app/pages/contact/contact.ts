import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.html',
  styleUrls: ['./contact.css'],
})
export class ContactComponent {
  showSuccess = false;
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

  async submit() {
    if (!this.canSubmit() || this.loading) return;

    this.loading = true;
    this.errorMessage = '';

    try {
      const response = await fetch('https://formspree.io/f/meeoraar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: this.form.fullName,
          email: this.form.email,
          phone: this.form.phone,
          subject: this.form.subject,
          message: this.form.message,
        }),
      });

      if (!response.ok) {
        throw new Error('Form gönderilemedi');
      }

      this.showSuccess = true;
      this.resetForm();
    } catch (err) {
      this.errorMessage = 'Mesaj gönderilemedi. Lütfen tekrar deneyin.';
    } finally {
      this.loading = false;
    }
  }

  closeModal() {
    this.showSuccess = false;
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
