// login.component.ts
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
  mensajeError: string = '';

  constructor(private router: Router, private authService: AuthService) {}

  iniciarSesion() {
    this.authService.login(this.email, this.password).subscribe((resultado) => {
      if (resultado) {
        this.router.navigate(['/menu-anfitrion']);
      } else {
        this.mensajeError = 'Credenciales incorrectas';
      }
    });
  }
}
