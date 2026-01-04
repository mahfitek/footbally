import { Component, HostListener } from '@angular/core';
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
  autoCloseTimer: any;

  onSubmit(event: Event) {
    event.preventDefault();

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

    this.autoCloseTimer = setTimeout(() => {
      this.close();
    }, 2500);
  }

  close() {
    this.showSuccess = false;
    clearTimeout(this.autoCloseTimer);
  }

  @HostListener('document:keydown.escape')
  onEsc() {
    if (this.showSuccess) {
      this.close();
    }
  }
}
