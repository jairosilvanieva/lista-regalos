// menu-invitado.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-invitado',
  templateUrl: './menu-invitado.component.html',
  styleUrls: ['./menu-invitado.component.css']
})
export class MenuInvitadoComponent implements OnInit {
  eventoId: string | null = '';
  nombreInvitado: string | null = '';
  apellidoInvitado: string | null = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Obtener los datos del invitado y del evento del localStorage
    this.eventoId = localStorage.getItem('codigoEvento');
    this.nombreInvitado = localStorage.getItem('nombreInvitado');
    this.apellidoInvitado = localStorage.getItem('apellidoInvitado');

    // Verificar si el invitado es válido
    if (!this.eventoId || !this.nombreInvitado || !this.apellidoInvitado) {
      // Redirigir al formulario de ingreso si no hay datos válidos
      this.router.navigate(['/ingreso-codigo-invitado']);
    }
  }

  verRegalos(): void {
    this.router.navigate(['/regalos-invitado']);
  }

  verEvento(): void {
    if (this.eventoId) {
      this.router.navigate([`/eventos/${this.eventoId}`]); // Usar eventoId que representa el código del evento
    } else {
      alert('No se encontró un evento válido.');
    }
  }
  
  

  cerrarSesion(): void {
    // Limpiar los datos del localStorage
    localStorage.removeItem('codigoEvento');
    localStorage.removeItem('nombreInvitado');
    localStorage.removeItem('apellidoInvitado');
    localStorage.removeItem('dniInvitado');

    // Redirigir al formulario de ingreso del invitado
    this.router.navigate(['/ingreso-codigo-invitado']);
  }
}
