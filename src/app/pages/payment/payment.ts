import { Component } from '@angular/core';

@Component({
  selector: 'app-payment',
  standalone: true,
  templateUrl: './payment.html',
  styleUrl: './payment.css',
})
export class PaymentComponent {

  playerName = 'Ahmet Yılmaz';
  position = 'Forvet';
  matchTitle = 'Halı Saha Maçı';

  playerPrice = 1000;
  serviceFee = 20;

  get total() {
    return this.playerPrice + this.serviceFee;
  }

  pay() {
    console.log('ÖDEME BAŞLATILDI', {
      player: this.playerName,
      total: this.total,
    });
  }
}
