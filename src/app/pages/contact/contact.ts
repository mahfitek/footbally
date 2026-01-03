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

    /**
     * ⚠️ ŞU AN:
     * - Mail gönderimi YOK
     * - API YOK
     * - Backend YOK
     *
     * Bir sonraki adımda:
     * → Formspree / Namecheap üzerinden bağlayacağız
     */

    setTimeout(() => {
      this.showSuccess = true;
      this.loading = false;
      this.resetForm();
    }, 500);
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
