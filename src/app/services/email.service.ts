import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface SendEmailPayload {
  to: string | string[];
  subject: string;
  html: string;
}

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  private apiUrl = '/api/send-email';

  constructor(private http: HttpClient) {}

  sendEmail(payload: SendEmailPayload): Observable<any> {
    return this.http.post(this.apiUrl, payload);
  }
}
