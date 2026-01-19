import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone:true,
  imports:[CommonModule],
  template:`
    <h1>Reports & Moderation</h1>
    <div class="empty">Moderation queue will load here.</div>
  `,
  styles:[`.empty{opacity:.6;margin-top:20px;}`]
})
export class ReportListComponent{}
