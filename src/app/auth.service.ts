import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { User } from './models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/anfitriones'; // URL donde está la lista de anfitriones

  constructor(private http: HttpClient, private router: Router) {}

  // Iniciar sesión obteniendo el anfitrión desde el backend
  iniciarSesion(email: string, password: string): Observable<string | null> {
    return this.http.get<User[]>(this.apiUrl).pipe(
      map((anfitriones) => {
        const usuario = anfitriones.find(
          (anfitrion) =>
            anfitrion.email === email && anfitrion.password === password
        );
        return usuario ? usuario.id : null;
      }),
      catchError(() => of(null)) // En caso de error, devolvemos null
    );
  }

  // Almacenar el anfitriónId
  guardarSesion(anfitrionId: string): void {
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
  registrarAnfitrion(anfitrion: User): Observable<User | null> {
    return this.http.get<User[]>(this.apiUrl).pipe(
      switchMap((anfitriones) => {
        const usuarioExistente = anfitriones.find(
          (user) => user.email === anfitrion.email
        );
        if (usuarioExistente) {
          return of(null); // Email ya está en uso, devolvemos null
        }
        return this.http.post<User>(`${this.apiUrl}`, anfitrion); // Si no existe, lo registramos
      }),
      catchError(() => of(null)) // En caso de error, devolvemos null
    );
  }
}
