import { Component, OnInit } from '@angular/core';
import { EventsService } from '../../services/events.service';
import { GiftsService } from '../../services/gifts.service';
import { Event, Gift } from '../../interfaces';

@Component({
  selector: 'app-guest-menu',
  templateUrl: './guest-menu.component.html',
  styleUrls: ['./guest-menu.component.css'],
})
export class GuestMenuComponent implements OnInit {
  event: Event = {
    id: '',
    eventType: '',
    location: '',
    date: '',
    time: '',
    description: '',
    code: '',
    userId: ''
  };
  gifts: Gift[] = [];

  constructor(
    private eventsService: EventsService,
    private giftsService: GiftsService,
  ) {}

  ngOnInit(): void {
    const eventCode = localStorage.getItem('eventCode');
    if (eventCode) {
      this.loadEvent(eventCode);
    }
  }

  loadEvent(code: string): void {
    this.eventsService.verifyEventCode(code).subscribe((events: any[]) => {
      if (events.length > 0) {
        this.event = events[0];
        this.loadGifts(this.event.id); // Cargar regalos asociados al evento
      } else {
        alert('Event not found');
      }
    });
  }

  loadGifts(eventId: string): void {
    this.giftsService.getGiftsByEvent(eventId).subscribe((gifts: any[]) => {
      this.gifts = gifts;
    });
  }

  selectGift(gift: any): void {
    if (!gift.isSelected) {
      gift.isSelected = true;
      this.giftsService.updateGift(gift).subscribe(() => {
        alert('Gift selected successfully');
      });
    } else {
      alert('This gift has already been selected.');
    }
  }
}
