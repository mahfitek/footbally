import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class AdminComponent {
  matches = [
    {
      team: 'Kartallar FC',
      player: 'Ahmet',
      price: 1000,
      isPaid: true,
      isCompleted: true,
      rating: 5,
      comment: 'Çok iyi oynadı',
    },
    {
      team: 'Aslanlar',
      player: 'Mehmet',
      price: 900,
      isPaid: false,
      isCompleted: false,
      rating: null,
      comment: null,
    },
  ];

  banPlayer(player: string) {
    console.log('BANLANDI:', player);
  }

  deleteComment(player: string) {
    console.log('YORUM SİLİNDİ:', player);
  }
}
