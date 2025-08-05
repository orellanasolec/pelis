import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { CrudComponent } from './crud/crud.component';
import { IngresarPeliculaComponent } from './ingresar-pelicula/ingresar-pelicula.component';
import { EliminarPeliculaComponent } from './eliminar-pelicula/eliminar-pelicula.component';
import { BuscarPeliculaComponent } from './buscar-pelicula/buscar-pelicula.component';
import { ModificarPeliculaComponent } from './modificar-pelicula/modificar-pelicula.component';


const routes: Routes = [
  { path: '', component: HomeComponent }, // Ruta raíz
  { path: 'login', component: LoginComponent }, // Ruta para el enlace
  {path: 'crud',component:CrudComponent,},
  {path: 'ingresarPelicula',component:IngresarPeliculaComponent},
  {path: 'listarPeliculas',component:EliminarPeliculaComponent},
  {path: 'buscarPelicula',component:BuscarPeliculaComponent},
  {path: 'modificarPelicula/:id',component:ModificarPeliculaComponent},
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
