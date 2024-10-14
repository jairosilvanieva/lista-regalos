import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Definir la interfaz Event localmente
interface Event {
  id: string;
  eventType: string;
  location: string;
  date: string;
  time: string;
  description: string;
  code: string;
  userId: string;
}

@Injectable({
  providedIn: 'root',
})
export class EventosService {
  private apiUrl = 'http://localhost:3000/events'; // URL base para eventos

  constructor(private http: HttpClient) {}

  // Obtener los eventos de un anfitrión específico
  getEventosPorAnfitrion(anfitrionId: string): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.apiUrl}?userId=${anfitrionId}`);
  }

  // Crear un nuevo evento
  crearEvento(evento: Event): Observable<Event> {
    return this.http.post<Event>(this.apiUrl, evento);
  }

  // Verificar el código del evento
  verificarCodigoEvento(codigo: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?codigo=${codigo}`);
  }
}
