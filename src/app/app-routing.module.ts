import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { ListaRegalosComponent } from './lista-regalos/lista-regalos.component';
import { IngresoCodigoInvitadoComponent } from './ingreso-codigo-invitado/ingreso-codigo-invitado.component';
import { RegalosInvitadoComponent } from './regalos-invitado/regalos-invitado.component';
import { MenuAnfitrionComponent } from './menu-anfitrion/menu-anfitrion.component';
import { EventosComponent } from './eventos/eventos.component';
import { MenuInvitadoComponent } from './menu-invitado/menu-invitado.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'eventos', component: EventosComponent },
  { path: 'eventos/:eventoId/regalos', component: ListaRegalosComponent },
  { path: 'ingreso-codigo-invitado', component: IngresoCodigoInvitadoComponent },
  { path: 'menu-invitado', component: MenuInvitadoComponent },

  { path: 'menu-anfitrion', component: MenuAnfitrionComponent },
 
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
