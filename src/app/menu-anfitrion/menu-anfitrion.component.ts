// menu-anfitrion.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventosService } from '../eventos.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-menu-anfitrion',
  templateUrl: './menu-anfitrion.component.html',
  styleUrls: ['./menu-anfitrion.component.css']
})
export class MenuAnfitrionComponent implements OnInit {
  tipoEvento: string = '';
  lugar: string = '';
  fecha: string = '';
  hora: string = '';
  descripcion: string = '';
  eventos: any[] = [];  // Lista de eventos creados por el anfitrión

  constructor(
    private router: Router,
    private eventosService: EventosService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.verificarAutenticacion();
    this.cargarEventos();
  }

  // Verificar si el usuario está autenticado
  verificarAutenticacion() {
    if (!this.authService.isAuthenticated()) {
      // Si no está autenticado, redirigir al login
      this.router.navigate(['/login']);
    }
  }

  // Cargar eventos existentes
  cargarEventos() {
    const anfitrionId = this.authService.obtenerAnfitrionId();  // Obtener el ID del anfitrión desde el servicio de autenticación
    if (anfitrionId) {
      this.eventosService.getEventosPorAnfitrion(anfitrionId).subscribe({
        next: (eventos: any[]) => {
          this.eventos = eventos;
        },
        error: (error: any) => {
          console.error('Error al cargar eventos:', error);
        }
      });
    }
  }

  // Crear un nuevo evento
  crearEvento() {
    const anfitrionId = this.authService.obtenerAnfitrionId();  // Obtener el ID del anfitrión desde el servicio de autenticación
    if (anfitrionId) {
      const nuevoEvento = {
        tipoEvento: this.tipoEvento,
        lugar: this.lugar,
        fecha: this.fecha,
        hora: this.hora,
        descripcion: this.descripcion,
        codigo: this.generarCodigoUnico(),  // Generar un código único
        anfitrionId: anfitrionId  // Asociar el evento al anfitrión logueado
      };

      this.eventosService.crearEvento(nuevoEvento).subscribe({
        next: () => {
          alert('Evento creado con éxito');
          this.cargarEventos();  // Recargar la lista de eventos
        },
        error: (error: any) => {
          console.error('Error al crear el evento:', error);
          alert('Error al crear el evento');
        }
      });
    }
  }

  // Generar un código único para el evento
  generarCodigoUnico(): string {
    let codigoUnico = '';
    let existeCodigo = true;

    // Generar un nuevo código hasta que sea único
    while (existeCodigo) {
      codigoUnico = Math.random().toString(36).substr(2, 8).toUpperCase();
      existeCodigo = this.eventos.some(evento => evento.codigo === codigoUnico);
    }

    return codigoUnico;
  }

  // Redirigir a la página para elegir regalos
  elegirRegalos(eventoId: string) {
    if (eventoId) {
      this.router.navigate(['/evento', eventoId, 'regalos']);  // Navega al componente de regalos asociado al evento
    } else {
      console.error('El eventoId es inválido o no existe.');
    }
}

  // Cerrar sesión
  cerrarSesion() {
    this.authService.cerrarSesion();
  }
}
