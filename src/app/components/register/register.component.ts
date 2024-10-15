import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../interfaces';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  name: string = '';
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  register(): void {
    const newUser: User = {
      id: this.generateUniqueId(),
      name: this.name,
      email: this.email,
      password: this.password,
      events: [],
    };

    this.authService.registerUser(newUser).subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (error: any) => {
        console.error('Error registering the user:', error);
      },
    });
  }

  generateUniqueId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}
