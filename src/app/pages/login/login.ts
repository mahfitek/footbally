import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LegalModalComponent } from '../../components/legal-modal/legal-modal.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    LegalModalComponent
  ],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {

  /* =====================
     MODE STATE
  ===================== */
  mode: 'select' | 'register' | 'login' | 'forgot' | 'forgot-success' = 'select';
  role: 'player' | 'team' | null = null;

  /* =====================
     FORM STATE
  ===================== */
  showPassword = false;
  showPasswordRepeat = false;

  register = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    passwordRepeat: '',
    privacy: false,
    kvkk: false,
    sms: false,
    mail: false
  };

  forgotEmail = '';

  /* =====================
     LEGAL MODAL
  ===================== */
  showLegal = false;
  legalType: 'privacy' | 'terms' = 'privacy';

  constructor(private router: Router) {}

  /* =====================
     REGISTER FLOW
  ===================== */

  selectRole(role: 'player' | 'team') {
    this.role = role;
    this.mode = 'register';
  }

  passwordsMatch(): boolean {
    return (
      !!this.register.password &&
      this.register.password === this.register.passwordRepeat
    );
  }

  canRegister(): boolean {
    return !!(
      this.register.firstName &&
      this.register.lastName &&
      this.register.email &&
      this.register.phone &&
      this.register.password &&
      this.passwordsMatch() &&
      this.register.privacy &&
      this.register.kvkk
    );
  }

  submitRegister() {
    if (!this.canRegister() || !this.role) return;

    localStorage.setItem('userRole', this.role);
    this.router.navigate(['/']);
  }

  /* =====================
     LOGIN FLOW
  ===================== */
// LOGIN FORM STATE
loginEmail = '';
loginPassword = '';

// LOGIN VALIDATION
canLogin(): boolean {
  return !!(
    this.loginEmail.trim() &&
    this.loginPassword.trim()
  );
}

submitLogin() {
  if (!this.canLogin()) return;

  // demo auth
  localStorage.setItem('userRole', 'player');
  this.router.navigate(['/']);
}


  /* =====================
     FORGOT PASSWORD
  ===================== */

  submitForgotPassword() {
    if (!this.forgotEmail) return;
    this.mode = 'forgot-success';
  }

  /* =====================
     LEGAL MODAL FLOW
  ===================== */

 openLegal(type: 'privacy' | 'terms') {
  this.legalType = type;
  this.showLegal = true;
}

closeLegal(accepted: boolean) {
  if (accepted) {
    if (this.legalType === 'privacy') {
      this.register.privacy = true;
    }

    if (this.legalType === 'terms') {
      this.register.kvkk = true;
    }
  }

  this.showLegal = false;
}

  /* =====================
     NAVIGATION
  ===================== */

  goToLogin() { this.mode = 'login'; }
  goToRegister() { this.mode = 'register'; }
  goToSelect() { this.mode = 'select'; }
  goToForgot() { this.mode = 'forgot'; }
}
