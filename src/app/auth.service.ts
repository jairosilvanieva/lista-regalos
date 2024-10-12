import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/users'; // URL where the users list is

  constructor(private http: HttpClient, private router: Router) {}

  // Login by fetching the user from the backend
  login(email: string, password: string): Observable<string | null> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map((users) => {
        const user = users.find(
          (u) => u.email === email && u.password === password
        );
        return user ? user.id : null;
      }),
      catchError(() => of(null)) // In case of error, return null
    );
  }

  // Store the userId
  saveSession(userId: string): void {
    localStorage.setItem('userId', userId);
  }

  // Logout
  logout(): void {
    localStorage.removeItem('userId');
    this.router.navigate(['/login']);
  }

  // Get the current user ID
  getUserId(): string | null {
    return localStorage.getItem('userId');
  }

  // Check if the user is authenticated
  isAuthenticated(): boolean {
    return localStorage.getItem('userId') !== null;
  }

  // Register a new user
  registerUser(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, user);
  }
}
