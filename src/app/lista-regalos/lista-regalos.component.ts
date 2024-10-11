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
  regalos: any[] = [];
  eventoId: string = '';
  nuevoRegalo: { nombre: string; descripcion: string } = { nombre: '', descripcion: '' };
  private routeSub: Subscription = new Subscription();

  constructor(
    private regalosService: RegalosService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
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
        id: this.generarIdUnico(),
        name: this.nuevoRegalo.nombre,
        description: this.nuevoRegalo.descripcion,
        isSelected: false,
        eventId: this.eventoId
      };

      this.regalosService.addRegalo(regalo).subscribe(() => {
        alert('Regalo agregado con éxito');
        this.cargarRegalos();
        this.nuevoRegalo = { nombre: '', descripcion: '' };
      }, (error: any) => {
        console.error('Error al agregar regalo:', error);
      });
    } else {
      alert('Por favor, complete todos los campos para agregar un regalo.');
    }
  }

  generarIdUnico(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }
}
