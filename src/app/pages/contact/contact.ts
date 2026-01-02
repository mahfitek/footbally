import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmailService } from '../../services/email.service';

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

  constructor(private emailService: EmailService) {}

  canSubmit(): boolean {
    return !!(
      this.form.fullName &&
      this.form.email &&
      this.form.subject &&
      this.form.message
    );
  }

  submit() {
    if (!this.canSubmit() || this.loading) return;

    this.loading = true;
    this.errorMessage = '';

    const html = `
      <h2>Yeni İletişim Formu</h2>
      <p><strong>Ad Soyad:</strong> ${this.form.fullName}</p>
      <p><strong>E-posta:</strong> ${this.form.email}</p>
      <p><strong>Telefon:</strong> ${this.form.phone || '-'}</p>
      <p><strong>Konu:</strong> ${this.form.subject}</p>
      <hr />
      <p>${this.form.message}</p>
    `;

    this.emailService.sendEmail({
      to: 'info@getfootbally.com',
      subject: `İletişim: ${this.form.subject}`,
      html,
    }).subscribe({
      next: () => {
        this.showSuccess = true;
        this.loading = false;
        this.resetForm();
      },
      error: () => {
        this.errorMessage = 'Mesaj gönderilemedi. Lütfen tekrar deneyin.';
        this.loading = false;
      },
    });
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
