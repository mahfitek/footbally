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
  loading = false;
  showSuccessModal = false;
  errorMessage = '';

  form = {
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  };

  canSubmit(): boolean {
    return (
      !!this.form.fullName &&
      !!this.form.email &&
      !!this.form.subject &&
      !!this.form.message
    );
  }

  async submit() {
    if (!this.canSubmit() || this.loading) return;

    this.loading = true;
    this.errorMessage = '';

    try {
      const res = await fetch('https://formspree.io/f/meeoraar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          type: 'contact',
          ...this.form,
        }),
      });

      if (!res.ok) throw new Error('failed');

      this.showSuccessModal = true;
      this.resetForm();
    } catch {
      this.errorMessage = 'Mesaj gönderilemedi. Lütfen tekrar deneyin.';
    } finally {
      this.loading = false;
    }
  }

  closeModal() {
    this.showSuccessModal = false;
  }

  resetForm() {
    this.form = {
      fullName: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    };
  }
}
