import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact.html',
  styleUrls: ['./contact.css'],
})
export class ContactComponent {
  showSuccess = false;

  onSubmit(event: Event) {
    event.preventDefault();

    // Modal anında
    this.showSuccess = true;

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
