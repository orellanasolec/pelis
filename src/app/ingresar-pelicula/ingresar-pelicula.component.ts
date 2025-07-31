import { Component, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http'; // Asegúrate de importar HttpErrorResponse
import { BarraComponent } from '../barra/barra.component';
import { CommonModule } from '@angular/common';
import { Categoria } from '../../categoria.enum';
import { ApiService } from '../service/api.service';
import { FormsModule, NgForm } from '@angular/forms';
import { idService } from '../id.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ingresar-pelicula',
  standalone:true,
  imports:[BarraComponent,CommonModule,FormsModule],
  templateUrl: './ingresar-pelicula.component.html',
  styleUrl: './ingresar-pelicula.component.css'
})
export class IngresarPeliculaComponent {

constructor(private apiService: ApiService,private idservice:idService,private router:Router){}

  
    nombre:string='';
    descripcion:string='';
    duracion:number | null = null;
    imagen:string='';
    idCategoria:number=1;
    peliculas:any=[];
 
  

  categorias = [
    { value: Categoria.Aventura,label: 'Aventura'},
    { value: Categoria.Accion, label: 'Acción' },
    { value: Categoria.Comedia, label: 'Comedia' },
    { value: Categoria.Drama, label: 'Drama' },
    { value: Categoria.Terror, label: 'Terror' },
    { value: Categoria.CienciaFiccion, label: 'Ciencia Ficción' },
  ];

  agregarPelicula() {
    const duracionValida = Number(this.duracion);
    if (isNaN(duracionValida) || duracionValida <= 30) {
        alert('La duración debe ser un número mayor a 30 minutos.');
        return;
    }
    if (this.nombre.length > 255 || this.descripcion.length > 255 || this.imagen.length > 255) {
      alert('Los campos no deben exceder los 255 caracteres.');
      return;
    }

    this.apiService.agregarPelicula(this.nombre, this.descripcion, duracionValida, this.imagen, this.idCategoria)
      .subscribe({
        next: (response) => {
          console.log('Película agregada:', response);
          alert('Película agregada correctamente. Nombre: '+response.nombre+" id: "+response.id);
          this.peliculas.push(response); 
          this.limpiarFormulario()
          this.idservice.setId(response.id)
          this.router.navigate(['/buscarPelicula']);


      
        },
        error: (error) => {
          console.error('Error al agregar la película:', error);
          alert('Error al agregar la película');
           let errorMessage = 'Error desconocido al agregar la película.';

      // Intenta obtener un mensaje de error más específico del backend
      if (error.error instanceof ErrorEvent) {
        // Error del lado del cliente o de la red
        errorMessage = `Error del lado del cliente: ${error.error.message}`;
      } else {
        // El backend devolvió un código de respuesta no exitoso.
        // El cuerpo de la respuesta puede contener más detalles.
        console.error(
          `Código de error del backend: ${error.status}, ` +
          `cuerpo: ${error.error}`);

        if (error.status === 404) {
          errorMessage = 'Error 404: No se encontró la ruta para agregar la película en el servidor.';
        } else if (error.status === 400) {
          errorMessage = 'Error 400: Datos inválidos. Por favor, revisa la información ingresada.';
          // Si tu backend envía un mensaje específico en el cuerpo del error 400
          if (error.error && error.error.message) {
            errorMessage += ` Detalle: ${error.error.message}`;
          }
        } else if (error.status === 500) {
          errorMessage = 'Error 500: Error interno del servidor al procesar la solicitud.';
          if (error.error && error.error.message) {
            errorMessage += ` Detalle: ${error.error.message}`;
          }
        } else if (error.status === 0) {
            errorMessage = 'Error de red o CORS. El servidor no respondió o la conexión fue rechazada.';
        } else {
          errorMessage = `Error ${error.status}: ${error.statusText || 'Error en el servidor.'}`;
          if (error.error && typeof error.error === 'string') {
              errorMessage += ` Mensaje: ${error.error}`;
          } else if (error.error && error.error.message) {
              errorMessage += ` Mensaje: ${error.error.message}`;
          }
        }
      }

      alert(errorMessage); // Muestra el mensaje de error más detallado al usuario

        }
      });
    }


  soloNumeros(event: any) {
    const regex = /^[0-9]*$/; // Asegurarse de que el valor solo contenga números
    const input = event.target.value;

    if (!regex.test(input)) {
        event.target.value = input.replace(/[^0-9]/g, ''); // Elimina cualquier carácter no numérico
    }
}


  limpiarFormulario() {
    this.nombre = '';
    this.descripcion = '';
    this.duracion = null;
    this.imagen = '';
    this.idCategoria = 1;
   
  }

  validarPegado(event: ClipboardEvent): void {
    const contenidoPegado = event.clipboardData?.getData('text');
    
    // Si el contenido pegado no es un número válido, previene la acción
    if (!contenidoPegado || !/^\d+$/.test(contenidoPegado)) {
      event.preventDefault();
    }
  }
  

}
