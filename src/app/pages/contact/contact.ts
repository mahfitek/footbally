import { Component, HostListener } from '@angular/core';
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
  autoCloseTimer: any;

  onSubmit(event: Event) {
    event.preventDefault();

    // Modal anında açılır
    this.openModal();

    const form = event.target as HTMLFormElement;

    fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' },
    }).finally(() => {
      form.reset();
    });
  }

  openModal() {
    this.showSuccess = true;

    // Auto-close (2.5 sn)
    this.autoCloseTimer = setTimeout(() => {
      this.close();
    }, 2500);
  }

  close() {
    this.showSuccess = false;
    clearTimeout(this.autoCloseTimer);
  }

  // ESC ile kapatma
  @HostListener('document:keydown.escape')
  onEsc() {
    if (this.showSuccess) {
      this.close();
    }
  }
}
