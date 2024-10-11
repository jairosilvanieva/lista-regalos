// regalos-invitado.component.ts
import { Component, OnInit } from '@angular/core';
import { RegalosService } from '../regalos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-regalos-invitado',
  templateUrl: './regalos-invitado.component.html',
  styleUrls: ['./regalos-invitado.component.css']
})
export class RegalosInvitadoComponent implements OnInit {
  listaRegalos: any[] = [];  // Lista de regalos para el evento
  eventoId: string | null = '';

  constructor(private regalosService: RegalosService, private router: Router) { }

  ngOnInit(): void {
    this.eventoId = localStorage.getItem('codigoEvento'); // Obtener el eventoId del localStorage
    const nombreInvitado = localStorage.getItem('nombreInvitado');
    const apellidoInvitado = localStorage.getItem('apellidoInvitado');

    // Verificar si el invitado es válido
    if (!this.eventoId || !nombreInvitado || !apellidoInvitado) {
      // Si los datos del invitado no están presentes, redirigir al formulario de ingreso
      this.router.navigate(['/ingreso-codigo-invitado']);
      return;
    }

    // Cargar los regalos si el invitado es válido
    this.obtenerRegalos();
  }

  obtenerRegalos(): void {
    if (this.eventoId) {
      this.regalosService.getRegalosPorEvento(this.eventoId).subscribe(
        (regalos) => {
          if (regalos.length === 0) {
            alert('No hay regalos disponibles para este evento.');
          }
          this.listaRegalos = regalos;
        },
        (error) => {
          console.error('Error al obtener los regalos:', error);
          alert('Ocurrió un error al cargar los regalos.');
        }
      );
    }
  }

  seleccionarRegalo(regalo: any): void {
    if (!regalo.seleccionado) {
      regalo.seleccionado = true;
      this.regalosService.actualizarRegalo(regalo).subscribe(
        () => {
          alert('Regalo seleccionado con éxito');
          this.obtenerRegalos(); // Recargar los regalos después de seleccionar
        },
        (error) => {
          console.error('Error al seleccionar el regalo:', error);
          alert('Ocurrió un error al seleccionar el regalo.');
        }
      );
    } else {
      alert('Este regalo ya fue seleccionado.');
    }
  }
}
