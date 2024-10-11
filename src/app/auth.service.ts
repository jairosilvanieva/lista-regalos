import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/users'; 

  constructor(private http: HttpClient, private router: Router) {}

  iniciarSesion(email: string, password: string): Observable<string | null> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map((usuarios) => {
        const usuario = usuarios.find(
          (u) => u.email === email && u.password === password
        );
        return usuario ? usuario.id : null;
      }),
      catchError(() => of(null))
    );
  }

  guardarSesion(userId: string): void {
    localStorage.setItem('userId', userId);
  }

  cerrarSesion(): void {
    localStorage.removeItem('userId');
    this.router.navigate(['/login']);
  }

  obtenerUserId(): string | null {
    return localStorage.getItem('userId');
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('userId') !== null;
  }

  registrarUsuario(usuario: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, usuario);
  }
}
