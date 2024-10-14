import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventosService } from '../eventos.service';
import { AuthService } from '../auth.service';

interface Event {
  id: string;
  eventType: string;
  location: string;
  date: string;
  time: string;
  description: string;
  code: string;
  userId: string;
}

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css'],
})
export class EventsComponent implements OnInit {
  userId: string = '';
  events: Event[] = [];
  eventId: string = '';
  eventType: string = '';
  location: string = '';
  date: string = '';
  time: string = '';
  description: string = '';

  constructor(
    private eventosService: EventosService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Assuming userId is stored in localStorage after login
    this.userId = localStorage.getItem('userId') || '';

    if (this.userId) {
      this.loadEvents();
    }
  }

  loadEvents(): void {
    this.eventosService
      .getEventosPorAnfitrion(this.userId)
      .subscribe((data: any[]) => {
        this.events = data;
      });
  }

  createEvent() {
    const userId = this.authService.getUserId();
    if (userId) {
      const newEvent: Event = {
        id: this.generateUniqueId(),
        eventType: this.eventType,
        location: this.location,
        date: this.date,
        time: this.time,
        description: this.description,
        code: this.generateUniqueCode(),
        userId: userId,
      };

      this.eventosService.crearEvento(newEvent).subscribe({
        next: () => {
          alert('Event successfully created');
          this.loadEvents();
        },
        error: (error: any) => {
          console.error('Error creating event:', error);
          alert('Error creating event');
        },
      });
    }
  }

  generateUniqueId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  generateUniqueCode(): string {
    let uniqueCode = '';
    let codeExists = true;

    while (codeExists) {
      uniqueCode = Math.random().toString(36).substr(2, 8).toUpperCase();
      codeExists = this.events.some((event) => event.code === uniqueCode);
    }

    return uniqueCode;
  }

  selectGifts(eventId: string) {
    this.router.navigate(['/events', eventId, 'gifts']);
  }

  logout() {
    this.authService.logout();
  }
}
