import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch } from '@angular/common/http'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import {FormsModule} from '@angular/forms';
import { CrudComponent } from './crud/crud.component';
import { BarraComponent } from './barra/barra.component';
import { IngresarPeliculaComponent } from './ingresar-pelicula/ingresar-pelicula.component';
import { EliminarPeliculaComponent } from './eliminar-pelicula/eliminar-pelicula.component';
import { BuscarPeliculaComponent } from './buscar-pelicula/buscar-pelicula.component';
import { ModificarPeliculaComponent } from './modificar-pelicula/modificar-pelicula.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    AppComponent,
   
      
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    EliminarPeliculaComponent,
    FormsModule,
    IngresarPeliculaComponent,
    BuscarPeliculaComponent,
    ModificarPeliculaComponent,
    LoginComponent,
    HomeComponent,
    CrudComponent,
    BarraComponent,
    RouterModule,
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
