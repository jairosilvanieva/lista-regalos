import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { GiftListComponent } from './components/gift-list/gift-list.component';
import { IngresoCodigoInvitadoComponent } from './components/ingreso-codigo-invitado/ingreso-codigo-invitado.component';
import { EventsComponent } from './components/events/events.component';
import { MenuInvitadoComponent } from './components/menu-invitado/menu-invitado.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'events', component: EventsComponent },
  { path: 'events/:eventId/gifts', component: GiftListComponent },
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
