import { Component, ViewChild } from '@angular/core';
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

}
