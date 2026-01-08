import { Component } from '@angular/core';

@Component({
  selector: 'app-premium',
  standalone: true,
  templateUrl: './premium.html',
  styleUrls: ['./premium.css'],
})
export class PremiumComponent {
  goToBenefits(): void {
    // avantajlar bölümüne scroll veya route
    document
      .querySelector('.premium-does')
      ?.scrollIntoView({ behavior: 'smooth' });
  }

  continueFree(): void {
    // free akışa geri dönüş (route veya history)
    window.history.back();
  }
}
