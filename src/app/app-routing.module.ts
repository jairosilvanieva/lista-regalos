import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ListaRegalosComponent } from './lista-regalos/lista-regalos.component';
import { IngresoCodigoInvitadoComponent } from './ingreso-codigo-invitado/ingreso-codigo-invitado.component';
import { EventsComponent } from './eventos/eventos.component';
import { MenuInvitadoComponent } from './menu-invitado/menu-invitado.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'eventos', component: EventsComponent },
  { path: 'eventos/:eventoId/regalos', component: ListaRegalosComponent },
  {
    path: 'ingreso-codigo-invitado',
    component: IngresoCodigoInvitadoComponent,
  },
  { path: 'menu-invitado', component: MenuInvitadoComponent },

  { path: '**', redirectTo: '/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
