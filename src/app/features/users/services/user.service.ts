import { inject, Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  http = inject(HttpClient);
urlAPI = 'http://localhost:3000/users';
  getUserList(): Observable<User[]> {
    return this.http.get<User[]>(this.urlAPI).pipe(catchError((error) => {
      console.error('Error fetching user list:', error);
      throw error;
    }));
  }
}
