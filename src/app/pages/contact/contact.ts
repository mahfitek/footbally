import { Component, NgZone } from '@angular/core';
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
  errorMessage = '';

  form = {
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  };

  constructor(private zone: NgZone) {}

  canSubmit(): boolean {
    return !!(
      this.form.fullName &&
      this.form.email &&
      this.form.subject &&
      this.form.message
    );
  }

  submit() {
    if (!this.canSubmit()) return;

    this.errorMessage = '';

    fetch('https://formspree.io/f/meeoraar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        type: 'contact',
        ...this.form,
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error('failed');

        // 🔥 Angular'a zorla UI güncellettiriyoruz
        this.zone.run(() => {
          this.showSuccess = true;
          this.resetForm();
        });
      })
      .catch(() => {
        this.zone.run(() => {
          this.errorMessage = 'Mesaj gönderilemedi. Lütfen tekrar deneyin.';
        });
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
