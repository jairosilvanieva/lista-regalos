import { Component, OnInit } from '@angular/core';
import { RegalosService } from '../regalos.service';

@Component({
  selector: 'app-regalos-invitado',
  templateUrl: './regalos-invitado.component.html',
  styleUrls: ['./regalos-invitado.component.css']
})
export class RegalosInvitadoComponent implements OnInit {
  listaRegalos: any[] = [];  // Aquí cargaremos los regalos

  constructor(private regalosService: RegalosService) { }

  ngOnInit(): void {
    this.obtenerRegalos();
  }

  obtenerRegalos(): void {
    this.regalosService.getRegalos().subscribe((regalos: any[]) => {
      this.listaRegalos = regalos;
    });
  }

  seleccionarRegalo(regalo: any): void {
    if (!regalo.seleccionado) {
      regalo.seleccionado = true;
      this.regalosService.actualizarRegalo(regalo).subscribe(() => {
        alert('Regalo seleccionado con éxito');
      });
    } else {
      alert('Este regalo ya fue seleccionado.');
    }
  }
}
