import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { AuthService, LoginCredentials } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page.component',
  imports: [ReactiveFormsModule, MatInputModule, MatFormFieldModule, MatButtonModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
})
export class LoginPageComponent {
  loading = false;
  error: string | null = null;
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  onSubmit() {
    console.log(this.loginForm.value);
    if (this.loginForm.valid) {
      const credentials: LoginCredentials = {
        email: this.loginForm.value.email!,
        password: this.loginForm.value.password!,
      };

      this.authService.login(credentials).subscribe({
        next: () => {
          this.router.navigate(['/products']);
        },
        error: (error) => {},
        complete: () => {},
      });
    } else {
      console.log('FormGroup errors:', this.loginForm.errors);
      console.log('Email valid:', this.loginForm.get('email')?.valid);
      console.log('Email errors:', this.loginForm.get('email')?.errors);
      console.log('Password valid:', this.loginForm.get('password')?.valid);
      console.log('Password errors:', this.loginForm.get('password')?.errors);
    }
  }
}
