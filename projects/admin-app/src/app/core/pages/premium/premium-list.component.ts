import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone:true,
  imports:[CommonModule],
  template:`
    <h1>Premium Management</h1>
    <div class="empty">Subscription service will be connected here.</div>
  `,
  styles:[`.empty{opacity:.6;margin-top:20px;}`]
})
export class PremiumListComponent{}
