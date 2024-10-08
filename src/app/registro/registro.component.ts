import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent {
  nombre: string = '';
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService) {}

  registrar(): void {
    const nuevoAnfitrion = {
      nombre: this.nombre,
      email: this.email,
      password: this.password,
    };

    this.authService.registrarAnfitrion(nuevoAnfitrion).subscribe({
      next: () => {
        alert('Registro exitoso');
      },
      error: (error) => {
        console.error('Error al registrar el anfitrión:', error);
      },
    });
  }
}
