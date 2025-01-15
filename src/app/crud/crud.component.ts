import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IngresarPeliculaComponent } from '../ingresar-pelicula/ingresar-pelicula.component';
import { ModificarPeliculaComponent } from '../modificar-pelicula/modificar-pelicula.component';
import { EliminarPeliculaComponent } from '../eliminar-pelicula/eliminar-pelicula.component';
import { BuscarPeliculaComponent } from '../buscar-pelicula/buscar-pelicula.component';
import { BarraComponent } from '../barra/barra.component';

@Component({
  selector: 'app-crud',
  standalone:true,
  imports: [ IngresarPeliculaComponent,ModificarPeliculaComponent,EliminarPeliculaComponent,BuscarPeliculaComponent,BarraComponent,RouterModule],
  templateUrl: './crud.component.html',
  styleUrl: './crud.component.css'
})
export class CrudComponent {

}
