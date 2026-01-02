import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { HeaderComponent } from './layout/header/header';
import { FooterComponent } from './layout/footer/footer';
import { LegalModalComponent } from './components/legal-modal/legal-modal.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    LegalModalComponent
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {

  showLegal = false;
legalType: 'privacy' | 'terms' = 'privacy';
legalTitle = '';

openLegalModal(type: 'privacy' | 'terms') {
  this.legalType = type;
  this.legalTitle =
    type === 'privacy'
      ? 'Gizlilik Politikası'
      : 'Kullanım Şartları';

  this.showLegal = true;
}

closeLegalModal() {
  this.showLegal = false;
}
}
