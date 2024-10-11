import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventosService } from '../eventos.service';
import { RegalosService } from '../regalos.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-lista-regalos',
  templateUrl: './lista-regalos.component.html',
  styleUrls: ['./lista-regalos.component.css'],
})
export class ListaRegalosComponent implements OnInit, OnDestroy {
  evento: any = null;  // Información del evento
  regalos: any[] = [];  // Lista de regalos para el evento
  eventoId: string = '';  // ID del evento actual
  nuevoRegalo: { nombre: string; descripcion: string } = { nombre: '', descripcion: '' };  // Nuevo regalo a agregar
  private routeSub: Subscription = new Subscription();

  constructor(
    private eventosService: EventosService,
    private regalosService: RegalosService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Obtener el eventoId desde la URL
    this.routeSub = this.route.params.subscribe((params) => {
      this.eventoId = params['eventoId'];
      this.cargarEvento();  // Cargar los detalles del evento
      this.cargarRegalos(); // Cargar la lista de regalos
    });
  }

 // lista-regalos.component.ts
cargarEvento(): void {
  if (this.eventoId) {
    this.eventosService.getEventosPorId(this.eventoId).subscribe(
      (evento) => {
        if (evento) {
          this.evento = evento;
        } else {
          this.evento = null;
          console.warn('No se encontró un evento con el ID proporcionado.');
        }
      },
      (error) => {
        console.error('Error al cargar el evento:', error);
        alert('Ocurrió un error al cargar el evento.');
      }
    );
  }
}

  cargarRegalos(): void {
    if (this.eventoId) {
      this.regalosService.getRegalosPorEvento(this.eventoId).subscribe(
        (data: any[]) => {
          this.regalos = data;
        },
        (error) => {
          console.error('Error al cargar los regalos:', error);
          alert('Ocurrió un error al cargar los regalos.');
        }
      );
    }
  }

  agregarRegalo(): void {
    if (this.nuevoRegalo.nombre && this.nuevoRegalo.descripcion) {
      const regalo = {
        nombre: this.nuevoRegalo.nombre,
        descripcion: this.nuevoRegalo.descripcion,
        eventoId: this.eventoId
      };

      this.regalosService.addRegalo(regalo).subscribe(
        () => {
          alert('Regalo agregado con éxito');
          this.cargarRegalos();  // Recargar la lista de regalos después de agregar uno nuevo
          this.nuevoRegalo = { nombre: '', descripcion: '' };  // Limpiar los campos del nuevo regalo
        },
        (error: any) => {
          console.error('Error al agregar regalo:', error);
          alert('Error al agregar el regalo.');
        }
      );
    } else {
      alert('Por favor, complete todos los campos para agregar un regalo.');
    }
  }

  ngOnDestroy(): void {
    // Desuscribirse al finalizar el componente para evitar memory leaks
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }
}
