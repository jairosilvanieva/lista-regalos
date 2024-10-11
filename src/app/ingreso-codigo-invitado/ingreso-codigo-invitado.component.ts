import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RegalosService } from '../regalos.service';

@Component({
  selector: 'app-ingreso-codigo-invitado',
  templateUrl: './ingreso-codigo-invitado.component.html',
  styleUrls: ['./ingreso-codigo-invitado.component.css']
})
export class IngresoCodigoInvitadoComponent {
  codigoEvento: string = '';
  nombreInvitado: string = '';
  apellidoInvitado: string = '';
  dniInvitado: string = '';

  constructor(private regalosService: RegalosService, private router: Router) {}

  ingresarComoInvitado() {
    this.regalosService.verificarCodigoEvento(this.codigoEvento).subscribe((eventos: any[]) => {
      if (eventos.length > 0) {
        const evento = eventos[0];
        const invitado = {
          nombre: this.nombreInvitado,
          apellido: this.apellidoInvitado,
          dni: this.dniInvitado,
          eventId: evento.id
        };

        this.regalosService.registrarInvitado(invitado).subscribe(() => {
          localStorage.setItem('codigoEvento', this.codigoEvento);
          this.router.navigate(['/menu-invitado']);
        }, (error) => {
          console.error('Error al registrar el invitado:', error);
        });
      } else {
        alert('Código de evento no válido');
      }
    }, (error) => {
      console.error('Error al verificar el código del evento:', error);
    });
  }
}
