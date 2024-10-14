import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventsService } from '../../services/events.service';
import { GiftsService } from '../../services/gifts.service';

@Component({
  selector: 'app-menu-invitado',
  templateUrl: './menu-invitado.component.html',
  styleUrls: ['./menu-invitado.component.css'],
})
export class MenuInvitadoComponent implements OnInit {
  evento: any = {};
  regalos: any[] = [];

  constructor(
    private eventsService: EventsService,
    private giftsService: GiftsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const codigoEvento = localStorage.getItem('codigoEvento');
    if (codigoEvento) {
      this.cargarEvento(codigoEvento);
    }
  }

  cargarEvento(codigo: string): void {
    this.eventsService.verifyEventCode(codigo).subscribe((eventos: any[]) => {
      if (eventos.length > 0) {
        this.evento = eventos[0];
        this.cargarRegalos(this.evento.id); // Cargar regalos asociados al evento
      } else {
        alert('Evento no encontrado');
      }
    });
  }

  cargarRegalos(eventoId: string): void {
    this.giftsService.getGiftsByEvent(eventoId).subscribe((regalos: any[]) => {
      this.regalos = regalos;
    });
  }

  seleccionarRegalo(regalo: any): void {
    if (!regalo.isSelected) {
      regalo.isSelected = true;
      this.giftsService.updateGift(regalo).subscribe(() => {
        alert('Regalo seleccionado con éxito');
      });
    } else {
      alert('Este regalo ya fue seleccionado.');
    }
  }
}
