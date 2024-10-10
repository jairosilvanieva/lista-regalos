import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/anfitriones'; // URL donde está la lista de anfitriones

  constructor(private http: HttpClient, private router: Router) {}

  // Iniciar sesión obteniendo el anfitrion desde el backend
  iniciarSesion(email: string, password: string): Observable<string | null> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map((anfitriones) => {
        const usuario = anfitriones.find(
          (anfitrion) => anfitrion.email === email && anfitrion.password === password
        );
        return usuario ? usuario.id : null;
      }),
      catchError(() => of(null)) // En caso de error, devolvemos null
    );
  }

  // Almacenar el anfitrionId
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
  registrarAnfitrion(anfitrion: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, anfitrion);
  }
}
