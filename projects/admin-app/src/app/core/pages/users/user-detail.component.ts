import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  standalone:true,
  imports:[CommonModule,FormsModule],
  template:`
    <h1>User Detail — #{{userId}}</h1>

    <div class="empty">User profile & AI analysis will load here.</div>

    <textarea [(ngModel)]="note" placeholder="Admin note..."></textarea>
  `,
  styles:[`
    .empty{opacity:.6;margin:20px 0;}
    textarea{width:100%;background:#0b1020;color:white;border:none;border-radius:8px;padding:10px;}
  `]
})
export class UserDetailComponent{

  userId:string|null=null;
  note='';

  constructor(route:ActivatedRoute){
    this.userId=route.snapshot.paramMap.get('id');
  }
}
