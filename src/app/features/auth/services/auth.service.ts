import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environments';
import { BehaviorSubject, Observable, tap } from 'rxjs';

export interface User {
  id: number;
  email: string;
  name: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  private currentUser = new BehaviorSubject<User | null>(null);
  private isAuthenticated = new BehaviorSubject<boolean>(false);

  currentUser$ = this.currentUser.asObservable();
  isAuthenticated$ = this.isAuthenticated.asObservable();

  constructor() {
    this.checkExistingAuth();
  }

  login(credentials: LoginCredentials): Observable<{ user: User; token: string }> {
    return this.http.post<{ user: User; token: string }>(`${this.apiUrl}/login`, credentials).pipe(
      tap((response) => {
        const mockUser: User = { id: 1, email: credentials.email, name: 'Utilisateur' };
        const mockToken = 'mock-jwt-token';

        localStorage.setItem('auth_token', mockToken);
        localStorage.setItem('user', JSON.stringify(mockUser));

        this.currentUser.next(mockUser);
        this.isAuthenticated.next(true);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
    this.currentUser.next(null);
    this.isAuthenticated.next(false);
  }

  private checkExistingAuth(): void {
    const token = localStorage.getItem('auth_token');
    const user = localStorage.getItem('user');

    if (token && user) {
      this.currentUser.next(JSON.parse(user));
      this.isAuthenticated.next(true);
    }
  }

  getCurrentUser(): User | null {
    return this.currentUser.value;
  }
}
