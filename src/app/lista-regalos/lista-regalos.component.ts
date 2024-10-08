import { Component, OnInit } from '@angular/core';
import { RegalosService } from '../regalos.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-lista-regalos',
  templateUrl: './lista-regalos.component.html',
  styleUrls: ['./lista-regalos.component.css'],
})
export class ListaRegalosComponent implements OnInit {
  regalos: any[] = [];  // Lista de regalos para el evento
  eventoId: string = '';  // ID del evento actual
  nuevoRegalo: { nombre: string; descripcion: string } = { nombre: '', descripcion: '' };  // Nuevo regalo a agregar
  private routeSub: Subscription = new Subscription();

  constructor(
    private regalosService: RegalosService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Obtener el eventoId desde la URL o de alguna fuente apropiada
    this.routeSub = this.route.params.subscribe((params) => {
      this.eventoId = params['eventoId'];
      this.cargarRegalos();
    });
  }

  cargarRegalos(): void {
    if (this.eventoId) {
      this.regalosService.getRegalosPorEvento(this.eventoId).subscribe((data: any[]) => {
        this.regalos = data;
      });
    }
  }

  agregarRegalo(): void {
    if (this.nuevoRegalo.nombre && this.nuevoRegalo.descripcion) {
      const regalo = {
        nombre: this.nuevoRegalo.nombre,
        descripcion: this.nuevoRegalo.descripcion,
        eventoId: this.eventoId
      };

      this.regalosService.addRegalo(regalo).subscribe(() => {
        alert('Regalo agregado con éxito');
        this.cargarRegalos();  // Recargar la lista de regalos después de agregar uno nuevo
        this.nuevoRegalo = { nombre: '', descripcion: '' };  // Limpiar los campos del nuevo regalo
      }, (error: any) => {
        console.error('Error al agregar regalo:', error);
      });
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
