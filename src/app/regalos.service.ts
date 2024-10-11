import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Definir la interfaz Gift localmente
interface Gift {
  id: string;
  name: string;
  description: string;
  isSelected: boolean;
  eventId: string;  // Asociar el regalo a un evento específico
}

@Injectable({
  providedIn: 'root'
})
export class RegalosService {
  private apiUrl = 'http://localhost:3000/gifts';  // URL base para regalos
  private guestsUrl = 'http://localhost:3000/guests';  // URL para los invitados
  private eventsUrl = 'http://localhost:3000/events'; // URL para eventos

  constructor(private http: HttpClient) {}

  // Obtener todos los regalos
  getRegalos(): Observable<Gift[]> {
    return this.http.get<Gift[]>(this.apiUrl);
  }

  // Obtener los regalos filtrados por eventoId
  getRegalosPorEvento(eventoId: string): Observable<Gift[]> {
    return this.http.get<Gift[]>(`${this.apiUrl}?eventId=${eventoId}`);
  }

  // Agregar un regalo
  addRegalo(regalo: Gift): Observable<Gift> {
    return this.http.post<Gift>(this.apiUrl, regalo);
  }

  // Actualizar un regalo
  actualizarRegalo(regalo: Gift): Observable<Gift> {
    return this.http.put<Gift>(`${this.apiUrl}/${regalo.id}`, regalo);
  }

  // Verificar el código del evento
  verificarCodigoEvento(codigo: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.eventsUrl}?codigo=${codigo}`);
  }

  // Registrar un invitado
  registrarInvitado(invitado: any): Observable<any> {
    return this.http.post<any>(this.guestsUrl, invitado);
  }
}
