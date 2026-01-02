import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-onboarding',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './onboarding.html',
  styleUrls: ['./onboarding.css'],
})
export class OnboardingComponent {
  step = 1;

  @Output() finish = new EventEmitter<void>();

  next() {
    this.step++;
  }

  complete() {
    this.finish.emit();
  }
}
