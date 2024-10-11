// eventos.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventosService {
  private apiUrl = 'http://localhost:3000'; // Base URL del JSON Server

  constructor(private http: HttpClient) {}

  // Obtener los eventos de un anfitrión específico
  getEventosPorAnfitrion(anfitrionId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/eventos?anfitrionId=${anfitrionId}`);
  }

  // Crear un nuevo evento
  crearEvento(evento: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/eventos`, evento);
  }

  // Obtener un evento por su ID
  getEventosPorId(eventoId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/eventos/${eventoId}`);
  }

  // Obtener un evento por su código
  // eventos.service.ts
getEventosPorCodigo(codigo: string): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/eventos?codigo=${codigo}`);
}

}
