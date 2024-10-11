import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  events: any[];
}

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent {
  nombre: string = '';
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  registrar(): void {
    const nuevoUsuario: User = {
      id: this.generarIdUnico(), 
      name: this.nombre,
      email: this.email,
      password: this.password,
      events: []
    };

    this.authService.registrarUsuario(nuevoUsuario).subscribe({
      next: () => {
        alert('Registro exitoso');
        this.router.navigate(['/login']); 
      },
      error: (error: any) => {
        console.error('Error al registrar el usuario:', error);
      },
    });
  }

  generarIdUnico(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}
