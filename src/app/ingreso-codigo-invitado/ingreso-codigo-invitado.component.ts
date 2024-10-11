// ingreso-codigo-invitado.component.ts
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
    if (this.codigoEvento && this.nombreInvitado && this.apellidoInvitado && this.dniInvitado) {
      this.regalosService.verificarCodigoEvento(this.codigoEvento).subscribe((eventos) => {
        if (eventos.length > 0) {
          const evento = eventos[0];  // Asumimos que el código de evento es único
          const invitado = {
            nombre: this.nombreInvitado,
            apellido: this.apellidoInvitado,
            dni: this.dniInvitado,
            codigoEvento: this.codigoEvento
          };

          // Registrar invitado
          this.regalosService.registrarInvitado(invitado).subscribe(() => {
            localStorage.setItem('codigoEvento', this.codigoEvento);
            localStorage.setItem('nombreInvitado', this.nombreInvitado);
            localStorage.setItem('apellidoInvitado', this.apellidoInvitado);
            localStorage.setItem('dniInvitado', this.dniInvitado);

            // Redirigir al menú del invitado
            this.router.navigate(['/menu-invitado']);
          }, (error) => {
            console.error('Error al registrar el invitado:', error);
            alert('Error al registrar el invitado.');
          });
        } else {
          alert('Código de evento no válido');
        }
      }, (error) => {
        console.error('Error al verificar el código del evento:', error);
        alert('Error al verificar el código del evento.');
      });
    } else {
      alert('Por favor, complete todos los campos.');
    }
  }
}
