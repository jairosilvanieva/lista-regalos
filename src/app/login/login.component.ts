import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private router: Router, private authService: AuthService) {}

  iniciarSesion() {
    // Simulamos la verificación de usuario en el backend
    if (this.email === 'jairo_s_22@hotmail.com' && this.password === '1234') {
      this.authService.iniciarSesion('351c'); // ID de Jairo Antonio
      this.router.navigate(['/menu-anfitrion']);
    } else if (this.email === 'yamila@gmail.com' && this.password === '1234') {
      this.authService.iniciarSesion('24c1'); // ID de Yamila
      this.router.navigate(['/menu-anfitrion']);
    } else {
      alert('Credenciales incorrectas');
    }
  }
}
