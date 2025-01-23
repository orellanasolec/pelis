import { Component, OnInit } from '@angular/core';
import { BarraComponent } from '../barra/barra.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Categoria } from '../../categoria.enum';
import { ApiService } from '../service/api.service';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { idService } from '../id.service';

@Component({
  selector: 'app-modificar-pelicula',
  standalone:true,
   imports:[BarraComponent,CommonModule,FormsModule],
  templateUrl: './modificar-pelicula.component.html',
  styleUrl: './modificar-pelicula.component.css'
})
export class ModificarPeliculaComponent implements OnInit{

   id:number=0;
   nombre:string="";
   descripcion:string="";
   duracion:string="";
   imagen:string="";
   puntuacion:number=0;
   idCategoria:number=0;
   nuevoid:string=""

  constructor(private apiService: ApiService,private authService:AuthService,private router:Router, private route: ActivatedRoute,private idservice:idService ){}


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id'];

      console.log('ID recibido:', this.id);
      this.nuevoid=this.id.toString()

     this.apiService.buscarPelicula(this.id).subscribe(
      (response) => {
        console.log('Datos de la película: ', response.categoria.id); 
       
        this.nombre=response.nombre;
        this.descripcion=response.descripcion;
        this.duracion=response.duracion;
        
        this.idCategoria=response.categoria.id;
        this.imagen=response.imagen;

               
        });
       
      },
      (error) => {
        console.error('Error al obtener los datos de la película:', error); // Manejamos errores aquí
      }
    );
   
  }
  



  categorias = [
    { value: Categoria.Accion, label: 'Acción' },
    { value: Categoria.Comedia, label: 'Comedia' },
    { value: Categoria.Drama, label: 'Drama' },
    { value: Categoria.Terror, label: 'Terror' },
    { value: Categoria.CienciaFiccion, label: 'Ciencia Ficción' },
  ];


  modificarPelicula(){
    if(this.authService.isTokenExpired()){
      alert("la sesión expiró")
      this.authService.logout()
      this.router.navigate(['/home']);
      return;
     }
     
    alert("pelicula modificada :"+this.nombre)
    this.apiService.modificarPelicula(this.nuevoid,this.nombre,this.descripcion,this.duracion,this.imagen,this.puntuacion,this.idCategoria)
    this.id=0;
    this.nombre="";
    this.descripcion="";
    this.duracion="";
    this.idCategoria=0;
    this.imagen="";
    this.idservice.setId(this.nuevoid);
    this.router.navigate(['/buscarPelicula']);

  }

  soloNumeros(event: any) {
    const regex = /[^0-9]/g;  // Expresión regular que coincide con todo lo que no sea número
    event.target.value = event.target.value.replace(regex, '');  // Reemplaza todo lo que no sea número con una cadena vacía
  }

 
}
