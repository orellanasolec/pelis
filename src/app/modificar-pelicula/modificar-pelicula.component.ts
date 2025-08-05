// =================================================================
// PIEZA #1: LOS IMPORTS (YA LOS TENÍAS BIEN)
// =================================================================
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Necesario para ngIf, ngFor en el template
import { FormsModule } from '@angular/forms'; // Necesario para ngModel
import { ActivatedRoute, Router } from '@angular/router';

import { PeliculasStateService } from '../servicios/peliculas-state.service';
import { ApiService } from '../service/api.service';
import { AuthService } from '../auth.service';
import { idService } from '../id.service';
// import { Categoria } from '../../categoria.enum'; // Asegúrate de que esta ruta es correcta
import { BarraComponent } from '../barra/barra.component'; // Si usas <app-barra>
import { Categoria } from '../../categoria.enum';

// =================================================================
// PIEZA #2: EL DECORADOR @Component (¡ESTA ES LA PARTE QUE FALTA!)
// =================================================================
@Component({
  selector: 'app-modificar-pelicula',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    BarraComponent // Añade aquí cualquier otro componente que uses en el HTML de este formulario
  ],
  templateUrl: './modificar-pelicula.component.html',
  styleUrl: './modificar-pelicula.component.css'
})
// =================================================================
// PIEZA #3: LA CLASE DEL COMPONENTE (EL CÓDIGO QUE YA PEGaste)
// =================================================================
export class ModificarPeliculaComponent implements OnInit {

  // --- Propiedades ---
  id: number = 0;
  nombre: string = "";
  descripcion: string = "";
  duracion: string = "";
  imagen: string = "";
  puntuacion: number = 0;
  idCategoria: number = 0;
  nuevoid: string = "";
  
   categorias = [
    { value: Categoria.Accion, label: 'Acción' },
    { value: Categoria.Comedia, label: 'Comedia' },
    { value: Categoria.Drama, label: 'Drama' },
    { value: Categoria.Terror, label: 'Terror' },
    { value: Categoria.CienciaFiccion, label: 'Ciencia Ficción' },
  ];

  // --- Constructor ---
  constructor(
    private peliculasStateService: PeliculasStateService,
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private idservice: idService
  ) { }

  // --- Lógica (ngOnInit, modificarPelicula, etc.) ---
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.nuevoid = this.id.toString();

      this.apiService.buscarPelicula(this.id).subscribe({
        next: (response) => {
          this.nombre = response.nombre;
          this.descripcion = response.descripcion;
          this.duracion = response.duracion;
          this.idCategoria = response.categoria.id;
          this.imagen = response.imagen;
        },
        error: (error) => {
          console.error('Error al obtener los datos de la película:', error);
        }
      });
    });
  }

  modificarPelicula() {
    const datosActualizados = {
      nombre: this.nombre,
      descripcion: this.descripcion,
      duracion: this.duracion,
      imagen: this.imagen,
      puntuacion: this.puntuacion,
      idCategoria: this.idCategoria
    };

    this.peliculasStateService.modificarPelicula(this.nuevoid, datosActualizados).subscribe({
      next: () => {
        alert("¡Película modificada con éxito!");
        this.router.navigate(['/listarPeliculas']);
      },
      error: (err) => {
        console.error("Error al guardar los cambios:", err);
        alert("Ocurrió un error al guardar. Por favor, inténtalo de nuevo.");
      }
    });
  }

  cancelar() {
    this.router.navigate(['/listarPeliculas']);
  }
}



 