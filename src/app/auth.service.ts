// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/anfitriones'; // Endpoint para los anfitriones

  constructor(private http: HttpClient, private router: Router) {}

  // Iniciar sesión almacenando el anfitrionId
  iniciarSesion(anfitrionId: string): void {
    localStorage.setItem('anfitrionId', anfitrionId);
  }

  // Cerrar sesión
  cerrarSesion(): void {
    localStorage.removeItem('anfitrionId');
    this.router.navigate(['/login']);
  }

  // Obtener el ID del anfitrión actual
  obtenerAnfitrionId(): string | null {
    return localStorage.getItem('anfitrionId');
  }

  // Verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    return localStorage.getItem('anfitrionId') !== null;
  }

  // Registrar un anfitrión
  registrarAnfitrion(anfitrion: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, anfitrion);
  }

  // Verificar las credenciales de inicio de sesión
  login(email: string, password: string): Observable<boolean> {
    return this.http.get<any[]>(`${this.apiUrl}?email=${email}&password=${password}`)
      .pipe(
        map((usuarios) => {
          if (usuarios.length > 0) {
            this.iniciarSesion(usuarios[0].id); // Guardar el ID del anfitrión
            return true; // Credenciales correctas
          }
          return false; // Credenciales incorrectas
        })
      );
  }
}
