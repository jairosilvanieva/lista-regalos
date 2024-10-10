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
    this.authService.iniciarSesion(this.email, this.password).subscribe((userId) => {
      if (userId) {
        this.authService.guardarSesion(userId);
        this.router.navigate(['/menu-anfitrion']);
      } else {
        alert('Credenciales incorrectas');
      }
    });
  }
}
