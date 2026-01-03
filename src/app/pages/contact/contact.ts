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

  submit() {
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
      type: 'contact',
      fullName: this.form.fullName,
      email: this.form.email,
      phone: this.form.phone,
      subject: this.form.subject,
      message: this.form.message,
    }),
  })
    .then((res) => {
      if (!res.ok) throw new Error();
      return res.json();
    })
    .then(() => {
      // 🔥 ÖNCE loading kapat
      this.loading = false;

      // 🔥 SONRA modal aç
      this.showSuccess = true;

      // 🔥 form reset
      this.form = {
        fullName: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      };
    })
    .catch(() => {
      this.loading = false;
      this.errorMessage = 'Mesaj gönderilemedi. Lütfen tekrar deneyin.';
    });
  }
}
