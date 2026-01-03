import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-support',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './support.html',
  styleUrls: ['./support.css'],
})
export class SupportComponent {
  showSuccess = false;

  onSubmit(event: Event) {
    event.preventDefault();

    // 🔥 1. Modal ANINDA açılır
    this.showSuccess = true;

    // 🔥 2. Formspree arka planda
    const form = event.target as HTMLFormElement;

    fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: {
        Accept: 'application/json',
      },
    }).finally(() => {
      form.reset();
    });
  }

  close() {
    this.showSuccess = false;
  }
}
