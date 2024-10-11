import { Component, OnInit } from '@angular/core';
import { RegalosService } from '../regalos.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-regalos-invitado',
  templateUrl: './regalos-invitado.component.html',
  styleUrls: ['./regalos-invitado.component.css']
})
export class RegalosInvitadoComponent implements OnInit {
  listaRegalos: any[] = [];
  eventoId: string = '';

  constructor(
    private regalosService: RegalosService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Obtener el eventoId desde la URL o de alguna fuente
    this.route.params.subscribe((params) => {
      this.eventoId = params['eventoId'];
      this.obtenerRegalos();
    });
  }

  obtenerRegalos(): void {
    if (this.eventoId) {
      this.regalosService.getRegalosPorEvento(this.eventoId).subscribe((regalos: any[]) => {
        this.listaRegalos = regalos;
      });
    }
  }

  seleccionarRegalo(regalo: any): void {
    if (!regalo.isSelected) {
      regalo.isSelected = true;
      this.regalosService.actualizarRegalo(regalo).subscribe(() => {
        alert('Regalo seleccionado con éxito');
      });
    } else {
      alert('Este regalo ya fue seleccionado.');
    }
  }
}
