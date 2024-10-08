import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
    return this.http.get<any[]>(`${this.apiUrl}/regalos`);
  }

  // Agregar un regalo
  addRegalo(regalo: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/regalos`, regalo);
  }

  // Actualizar un regalo
  actualizarRegalo(regalo: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/regalos/${regalo.id}`, regalo);
  }

  // Verificar el código del evento
  verificarCodigoEvento(codigo: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/eventos?codigo=${codigo}`);
  }

  // Registrar un invitado
  registrarInvitado(invitado: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/invitados`, invitado);
  }
}
