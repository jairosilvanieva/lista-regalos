import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common'; 
import { HttpClientModule } from '@angular/common/http'; // Importar HttpClientModule
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { MenuAnfitrionComponent } from './menu-anfitrion/menu-anfitrion.component';
import { ListaRegalosComponent } from './lista-regalos/lista-regalos.component';
import { IngresoCodigoInvitadoComponent } from './ingreso-codigo-invitado/ingreso-codigo-invitado.component';
import { RegalosInvitadoComponent } from './regalos-invitado/regalos-invitado.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { MenuInvitadoComponent } from './menu-invitado/menu-invitado.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuAnfitrionComponent,
    ListaRegalosComponent,
    IngresoCodigoInvitadoComponent,
    RegalosInvitadoComponent,
    LoginComponent,
    RegistroComponent,
    MenuInvitadoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, 
    CommonModule, 
    HttpClientModule, // Agregar HttpClientModule para el uso de HttpClient
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
