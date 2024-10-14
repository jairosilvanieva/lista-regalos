import { Component, OnInit } from '@angular/core';
import { GiftsService } from '../../services/gifts.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

interface Gift {
  id: string;
  name: string;
  description: string;
  isSelected: boolean;
  eventId: string; // Asociar el regalo a un evento específico
}

@Component({
  selector: 'app-gift-list',
  templateUrl: './gift-list.component.html',
  styleUrls: ['./gift-list.component.css'],
})
export class GiftListComponent implements OnInit {
  gifts: Gift[] = [];
  eventId: string = '';
  newGift: Gift = {
    id: '',
    name: '',
    description: '',
    isSelected: false,
    eventId: '',
  };
  private routeSub: Subscription = new Subscription();

  constructor(
    private giftsService: GiftsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe((params) => {
      this.eventId = params['eventId'];
      this.loadGifts();
    });
  }

  loadGifts(): void {
    if (this.eventId) {
      this.giftsService
        .getGiftsByEvent(this.eventId)
        .subscribe((data: Gift[]) => {
          this.gifts = data;
        });
    }
  }

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
          alert('Gift added successfully');
          this.loadGifts();
        },
        (error: any) => {
          console.error('Error adding gift:', error);
        }
      );
    } else {
      alert('Please complete all fields to add a gift.');
    }
  }

  generateUniqueId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }
}
