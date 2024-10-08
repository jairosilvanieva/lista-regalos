import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';  // Correcto para HttpClient

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistroComponent } from './registro/registro.component';
import { LoginComponent } from './login/login.component';
import { MenuAnfitrionComponent } from './menu-anfitrion/menu-anfitrion.component';
import { ListaRegalosComponent } from './lista-regalos/lista-regalos.component';
import { RegalosInvitadoComponent } from './regalos-invitado/regalos-invitado.component';
import { IngresoCodigoInvitadoComponent } from './ingreso-codigo-invitado/ingreso-codigo-invitado.component';
import { EventosComponent } from './eventos/eventos.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistroComponent,
    LoginComponent,
    MenuAnfitrionComponent,
    ListaRegalosComponent,
    RegalosInvitadoComponent,
    IngresoCodigoInvitadoComponent,
    EventosComponent  // Declarar el componente correctamente
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule  
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi())  // Nueva forma de proporcionar HttpClient
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
