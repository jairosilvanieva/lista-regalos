import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventosService } from '../eventos.service';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css'],
})
export class EventosComponent implements OnInit {
  eventos: any[] = [];
  evento: any = null;
  anfitrionId: string = '';
  eventoId: string = '';

  constructor(
    private eventosService: EventosService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Obtener el anfitrionId del localStorage
    this.anfitrionId = localStorage.getItem('anfitrionId') || '';
    if (this.anfitrionId) {
      this.cargarEventos();
    }

    // Obtener el ID del evento desde la URL (si existe)
    this.eventoId = this.route.snapshot.paramMap.get('eventoId') || '';
    if (this.eventoId) {
      this.cargarEvento();
    }
  }

  cargarEventos(): void {
    this.eventosService.getEventosPorAnfitrion(this.anfitrionId).subscribe(
      (data: any[]) => {
        this.eventos = data;
      },
      (error) => {
        console.error('Error al cargar los eventos:', error);
      }
    );
  }

  cargarEvento(): void {
    if (this.eventoId) {
      this.eventosService.getEventosPorCodigo(this.eventoId).subscribe(
        (eventos) => {
          if (eventos.length > 0) {
            this.evento = eventos[0];
          } else {
            this.evento = null;
            console.warn('No se encontró un evento con el código proporcionado.');
          }
        },
        (error) => {
          console.error('Error al cargar el evento:', error);
          alert('Ocurrió un error al cargar el evento.');
        }
      );
    }
  }
  
}
