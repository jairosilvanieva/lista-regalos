import { Component, OnInit } from '@angular/core';
import { RegalosService } from '../regalos.service';
import { EventosService } from '../eventos.service';

@Component({
  selector: 'app-menu-invitado',
  templateUrl: './menu-invitado.component.html',
  styleUrls: ['./menu-invitado.component.css']
})
export class MenuInvitadoComponent implements OnInit {
  evento: any = null;  // Datos del evento actual
  regalos: any[] = []; // Lista de regalos del evento
  codigoEvento: string = ''; // Código del evento, se obtiene del localStorage

  constructor(
    private regalosService: RegalosService,
    private eventosService: EventosService
  ) {}

  ngOnInit(): void {
    this.codigoEvento = localStorage.getItem('codigoEvento') || '';
    if (this.codigoEvento) {
      this.cargarEvento();
      this.cargarRegalos();
    }
  }

  cargarEvento(): void {
    this.eventosService.verificarCodigoEvento(this.codigoEvento).subscribe((eventos: any[]) => {
      if (eventos.length > 0) {
        this.evento = eventos[0];
      } else {
        alert('No se encontró el evento');
      }
    });
  }

  cargarRegalos(): void {
    if (this.evento && this.evento.id) {
      this.regalosService.getRegalosPorEvento(this.evento.id).subscribe((data: any[]) => {
        this.regalos = data;
      });
    }
  }

  seleccionarRegalo(regalo: any): void {
    if (!regalo.isSelected) {
      regalo.isSelected = true;
      this.regalosService.actualizarRegalo(regalo).subscribe(() => {
        alert('Regalo seleccionado con éxito');
        this.cargarRegalos();  // Recargar la lista de regalos
      });
    } else {
      alert('Este regalo ya fue seleccionado.');
    }
  }
}
