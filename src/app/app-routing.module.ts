import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { IngresoCodigoInvitadoComponent } from './ingreso-codigo-invitado/ingreso-codigo-invitado.component';
import { MenuAnfitrionComponent } from './menu-anfitrion/menu-anfitrion.component';
import { ListaRegalosComponent } from './lista-regalos/lista-regalos.component';
import { RegalosInvitadoComponent } from './regalos-invitado/regalos-invitado.component';
import { MenuInvitadoComponent } from './menu-invitado/menu-invitado.component';
import { AppComponent } from './app.component';
import { EventosComponent } from './eventos/eventos.component';

const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'login', component: LoginComponent },
  { path: 'ingreso-codigo-invitado', component: IngresoCodigoInvitadoComponent },
  { path: 'evento/:eventoId/regalos', component: ListaRegalosComponent },
  { path: 'menu-anfitrion', component: MenuAnfitrionComponent },
  { path: 'eventos', component: EventosComponent }, // Lista de eventos
  { path: 'eventos/:eventoId', component: EventosComponent }, // Detalles del evento
  { path: 'regalos-invitado', component: RegalosInvitadoComponent },
  { path: 'menu-invitado', component: MenuInvitadoComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
