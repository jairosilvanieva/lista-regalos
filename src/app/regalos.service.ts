import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegalosService {
  private apiUrl = 'http://localhost:3000';  // Base URL del JSON Server

  constructor(private http: HttpClient) {}

  // Obtener los regalos filtrados por eventoId
  getRegalosPorEvento(eventoId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/regalos?eventoId=${eventoId}`);
}


  // Obtener todos los regalos
  getRegalos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/regalos`)
      .pipe(
        catchError(error => {
          console.error('Error al obtener todos los regalos:', error);
          return throwError(error);
        })
      );
  }

  // Agregar un regalo
  addRegalo(regalo: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/regalos`, regalo)
      .pipe(
        catchError(error => {
          console.error('Error al agregar un regalo:', error);
          return throwError(error);
        })
      );
  }

  // Actualizar un regalo
  actualizarRegalo(regalo: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/regalos/${regalo.id}`, regalo)
      .pipe(
        catchError(error => {
          console.error('Error al actualizar el regalo:', error);
          return throwError(error);
        })
      );
  }

  // Verificar el código del evento
  verificarCodigoEvento(codigo: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/eventos?codigo=${codigo}`)
      .pipe(
        catchError(error => {
          console.error('Error al verificar el código del evento:', error);
          return throwError(error);
        })
      );
  }

  // Registrar un invitado
  registrarInvitado(invitado: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/invitados`, invitado)
      .pipe(
        catchError(error => {
          console.error('Error al registrar el invitado:', error);
          return throwError(error);
        })
      );
  }
}
