import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.html',
  styleUrls: ['./contact.css']
})
export class ContactComponent {

  showSuccess = false;

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

  submit() {
    if (!this.canSubmit()) return;

    this.showSuccess = true;
  }

  closeModal() {
    this.showSuccess = false;

    this.form = {
      fullName: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    };
  }
}
