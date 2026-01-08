import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-match-preview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './match-preview.component.html',
  styleUrls: ['./match-preview.component.css']
})
export class MatchPreviewComponent {

  @Input() match!: {
    date: string;
    time: string;
    city: string;
    district: string;
    fieldType: string;
    format: string;
    playersNeeded: number | null;
    price: number | null;
    travelCovered: boolean;
    foodCovered: boolean;
    description: string;
  };
}
