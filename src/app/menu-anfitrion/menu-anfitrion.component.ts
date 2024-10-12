import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventosService } from '../eventos.service';
import { AuthService } from '../auth.service';

interface Event {
  id: string;
  tipoEvento: string;
  lugar: string;
  fecha: string;
  hora: string;
  descripcion: string;
  codigo: string;
  userId: string;
}

@Component({
  selector: 'app-menu-anfitrion',
  templateUrl: './menu-anfitrion.component.html',
  styleUrls: ['./menu-anfitrion.component.css'],
})
export class MenuAnfitrionComponent implements OnInit {
  eventos: Event[] = [];

  tipoEvento: string = '';
  lugar: string = '';
  fecha: string = '';
  hora: string = '';
  descripcion: string = '';

  constructor(
    private router: Router,
    private eventosService: EventosService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.cargarEventos();
  }

  cargarEventos() {
    const anfitrionId = this.authService.getUserId();
    if (anfitrionId) {
      this.eventosService.getEventosPorAnfitrion(anfitrionId).subscribe({
        next: (eventos: Event[]) => {
          this.eventos = eventos;
        },
        error: (error: any) => {
          console.error('Error al cargar eventos:', error);
        },
      });
    }
  }

  crearEvento() {
    const anfitrionId = this.authService.getUserId();
    if (anfitrionId) {
      const nuevoEvento: Event = {
        id: this.generarIdUnico(),
        tipoEvento: this.tipoEvento,
        lugar: this.lugar,
        fecha: this.fecha,
        hora: this.hora,
        descripcion: this.descripcion,
        codigo: this.generarCodigoUnico(),
        userId: anfitrionId,
      };

      this.eventosService.crearEvento(nuevoEvento).subscribe({
        next: () => {
          alert('Evento creado con éxito');
          this.cargarEventos();
        },
        error: (error: any) => {
          console.error('Error al crear el evento:', error);
          alert('Error al crear el evento');
        },
      });
    }
  }

  generarIdUnico(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  generarCodigoUnico(): string {
    let codigoUnico = '';
    let existeCodigo = true;

    while (existeCodigo) {
      codigoUnico = Math.random().toString(36).substr(2, 8).toUpperCase();
      existeCodigo = this.eventos.some(
        (evento) => evento.codigo === codigoUnico
      );
    }

    return codigoUnico;
  }

  elegirRegalos(eventoId: string) {
    this.router.navigate(['/eventos', eventoId, 'regalos']);
  }

  cerrarSesion() {
    this.authService.logout();
  }
}
