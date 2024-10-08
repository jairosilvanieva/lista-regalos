import { Component, OnInit } from '@angular/core';
import { EventosService } from '../eventos.service';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css'],
})
export class EventosComponent implements OnInit {
  eventos: any[] = [];
  anfitrionId: string = '';

  constructor(private eventosService: EventosService) {}

  ngOnInit(): void {
    // Supongamos que el anfitrionId está almacenado en localStorage después del login
    this.anfitrionId = localStorage.getItem('anfitrionId') || '';

    if (this.anfitrionId) {
      this.cargarEventos();
    }
  }

  cargarEventos(): void {
    this.eventosService.getEventosPorAnfitrion(this.anfitrionId).subscribe((data: any[]) => {
      this.eventos = data;
    });
  }
}
