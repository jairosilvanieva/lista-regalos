import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'; // Importar HttpClientModule
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ListaRegalosComponent } from './lista-regalos/lista-regalos.component';
import { IngresoCodigoInvitadoComponent } from './ingreso-codigo-invitado/ingreso-codigo-invitado.component';
import { RegalosInvitadoComponent } from './regalos-invitado/regalos-invitado.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MenuInvitadoComponent } from './menu-invitado/menu-invitado.component';
import { EventsComponent } from './eventos/eventos.component';

@NgModule({
  declarations: [
    AppComponent,
    ListaRegalosComponent,
    IngresoCodigoInvitadoComponent,
    RegalosInvitadoComponent,
    LoginComponent,
    RegisterComponent,
    MenuInvitadoComponent,
    EventsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    HttpClientModule, // Agregar HttpClientModule para el uso de HttpClient
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
