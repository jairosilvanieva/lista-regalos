import { Component, OnInit } from '@angular/core';
import { GiftsService } from '../../services/gifts.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Gift } from '../../interfaces';


@Component({
  selector: 'app-gift-list',
  templateUrl: './gift-list.component.html',
  styleUrls: ['./gift-list.component.css'],
})
export class GiftListComponent implements OnInit {
  // Lista de regalos
  gifts: Gift[] = [];
  // ID del evento actual
  eventId: string = '';
  // Objeto para almacenar los datos de un nuevo regalo
  newGift: Gift = {
    id: '',
    name: '',
    description: '',
    isSelected: false,
    eventId: '',
  };
  // Suscripción a los parámetros de la ruta
  private routeSub: Subscription = new Subscription();

  constructor(
    private giftsService: GiftsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Suscribirse a los cambios en los parámetros de la ruta
    this.routeSub = this.route.params.subscribe((params) => {
      this.eventId = params['eventId'];
      this.loadGifts();
    });
  }

  // Cargar los regalos del evento actual
  loadGifts(): void {
    if (this.eventId) {
      this.giftsService
        .getGiftsByEvent(this.eventId)
        .subscribe((data: Gift[]) => {
          this.gifts = data;
        });
    }
  }

  // Añadir un nuevo regalo
  addGift(): void {
    if (this.newGift.name && this.newGift.description) {
      const gift: Gift = {
        id: this.generateUniqueId(),
        name: this.newGift.name,
        description: this.newGift.description,
        isSelected: false,
        eventId: this.eventId,
      };

      this.giftsService.addGift(gift).subscribe(
        () => {
          alert('Regalo añadido con éxito');
          this.loadGifts();
        },
        (error: any) => {
          console.error('Error al añadir el regalo:', error);
        }
      );
    } else {
      alert('Por favor, complete todos los campos para añadir un regalo.');
    }
  }

  // Generar un ID único para el nuevo regalo
  generateUniqueId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  ngOnDestroy(): void {
    // Cancelar la suscripción a los parámetros de la ruta al destruir el componente
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }
}
