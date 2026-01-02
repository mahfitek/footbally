import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-legal-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './legal-modal.component.html',
  styleUrls: ['./legal-modal.component.css']
})
export class LegalModalComponent {

  @Input() title = '';
  @Input() type: 'privacy' | 'terms' = 'privacy';

  @Output() close = new EventEmitter<boolean>();

  scrolledToBottom = false;

  onScroll(e: Event) {
    const el = e.target as HTMLElement;
    if (el.scrollHeight - el.scrollTop <= el.clientHeight + 2) {
      this.scrolledToBottom = true;
    }
  }

  accept() {
    this.close.emit(true);
  }

  cancel() {
    this.close.emit(false);
  }
}
