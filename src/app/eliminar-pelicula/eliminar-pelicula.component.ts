
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs'; 
import { PeliculasStateService, Pelicula } from '../servicios/peliculas-state.service'; // ¡LA IMPORTACIÓN CLAVE!

import { BarraComponent } from '../barra/barra.component';
import { FormsModule } from '@angular/forms';

import { BuscarPeliculaComponent } from '../buscar-pelicula/buscar-pelicula.component';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-eliminar-pelicula',
  standalone:true,
  imports:[CommonModule, FormsModule, BarraComponent, BuscarPeliculaComponent],
  templateUrl: './eliminar-pelicula.component.html',
  styleUrl: './eliminar-pelicula.component.css'
})
export class EliminarPeliculaComponent implements OnInit { // 3. IMPLEMENTA OnInit
  
 
  public peliculas$: Observable<Pelicula[]>;
  errorMessage: string = "";

  constructor(
    private peliculasStateService: PeliculasStateService, 
    private authService: AuthService,
    private router: Router
  ) {
   
    this.peliculas$ = this.peliculasStateService.peliculas$;
  }

  ngOnInit(): void {
    this.peliculasStateService.cargarPeliculas().subscribe({
      error: err => {
        console.error("Error al cargar la lista inicial de películas", err);
        this.errorMessage = "No se pudieron cargar las películas.";
      }
    });
  }
  

  eliminarPelicula(id: number) {
    const confirmacion = confirm("¿Está seguro que quiere eliminar la película con id:" + id + " ?");
    if (confirmacion) {
      this.peliculasStateService.eliminarPelicula(id).subscribe({
        next: () => {
          console.log('Película eliminada a través del servicio de estado.');
          this.errorMessage = "";
      
        },
        error: (err) => {
          console.error('Error al eliminar la película:', err);
          this.errorMessage = "No se pudo eliminar la película.";
        }
      });
    }
  }


  toModificar(id: number) {
    console.log(id);
    this.router.navigate(['/modificarPelicula', id]);
  }

  getNombreCategoria(idCategoria: number): string {
  switch (idCategoria) {
    case 1: return 'Acción';
    case 2: return 'Comedia';
    case 3: return 'Drama';
    case 4: return 'Terror';
    case 5: return 'Ciencia Ficción';
    default: return 'Desconocida'; 
  }
}
}
