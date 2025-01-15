import { Component, ViewChild } from '@angular/core';
import { BarraComponent } from '../barra/barra.component';
import { CommonModule } from '@angular/common';
import { Categoria } from '../../categoria.enum';
import { ApiService } from '../service/api.service';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-ingresar-pelicula',
  standalone:true,
  imports:[BarraComponent,CommonModule,FormsModule],
  templateUrl: './ingresar-pelicula.component.html',
  styleUrl: './ingresar-pelicula.component.css'
})
export class IngresarPeliculaComponent {

constructor(private apiService: ApiService,){}

  
    nombre:string='';
    descripcion:string='';
    duracion:string="";
    imagen:string='';
    idCategoria:number=1;
    peliculas:any=[];
 
  

  categorias = [
    { value: Categoria.Accion, label: 'Acción' },
    { value: Categoria.Comedia, label: 'Comedia' },
    { value: Categoria.Drama, label: 'Drama' },
    { value: Categoria.Terror, label: 'Terror' },
    { value: Categoria.CienciaFiccion, label: 'Ciencia Ficción' },
  ];

  agregarPelicula() {
    const duracionParse= parseInt(this.duracion,10)
    if (duracionParse <= 30) {
      alert('La duración debe ser mayor a 30 minutos.');
      return;
    }
    this.apiService.agregarPelicula(this.nombre, this.descripcion, this.duracion, this.imagen, this.idCategoria)
      .subscribe({
        next: (response) => {
          console.log('Película agregada:', response);
          alert('Película agregada correctamente. Nombre: '+response.nombre+" id: "+response.id);
          this.peliculas.push(response); 
          this.limpiarFormulario()
      
        },
        error: (error) => {
          console.error('Error al agregar la película:', error);
          alert('Error al agregar la película');
        }
      });
    }

  soloNumeros(event: any) {
    const regex = /[^0-9]/g;  // Expresión regular que coincide con todo lo que no sea número
    event.target.value = event.target.value.replace(regex, '');  // Reemplaza todo lo que no sea número con una cadena vacía
  }

  limpiarFormulario() {
    this.nombre = '';
    this.descripcion = '';
    this.duracion = '';
    this.imagen = '';
    this.idCategoria = 1;
   
  }

}
