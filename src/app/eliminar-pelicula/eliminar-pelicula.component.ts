import { Component } from '@angular/core';
import { BarraComponent } from '../barra/barra.component';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../service/api.service';
import { BuscarPeliculaComponent } from '../buscar-pelicula/buscar-pelicula.component';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { error } from 'console';

@Component({
  selector: 'app-eliminar-pelicula',
  standalone:true,
   imports:[BarraComponent,FormsModule,BuscarPeliculaComponent,CommonModule],
  templateUrl: './eliminar-pelicula.component.html',
  styleUrl: './eliminar-pelicula.component.css'
})
export class EliminarPeliculaComponent {
   constructor(private apiService: ApiService, private authService:AuthService,private router: Router){}
 
 errorMessage: string="";
 idPelicula:number=0;

  eliminarPelicula(id:number){
    this.idPelicula=id
    if(this.authService.isTokenExpired()){
      alert("la sesión expiró");
      this.authService.logout();
      this.router.navigate(['/home']);
      return;
     }
    
    if(this.idPelicula<1){
      alert("Ingrese un id válido");
    }else{

      const confirmacion = confirm("¿Está seguro que quiere eliminar la pelicula con id:"+this.idPelicula+" ?");
      if (confirmacion) {
        this.apiService.eliminarPelicula(this.idPelicula).subscribe({
          next: (response) => {
            console.log('Película eliminada con éxito:', response);
            this.errorMessage = ""; // Limpiar cualquier error previo
          },
          error: (error) => {
            console.error('Error al eliminar la película:', error);
            this.errorMessage = "Película no encontrada"; // Actualizar el mensaje de error
          }
        });
      }else {
        alert("Eliminación cancelada");
      }
    }

  
    }

    toModificar(id:string){
      console.log(id)
      this.router.navigate(['/modificarPelicula',id]);
    }
    

  usuario: string = '';
  password: string = '';

  ngOnInit(): void {
    this.llenarData();
  }

  data:any[]=[];

  llenarData(){
    this.apiService.getData().subscribe(data =>{
      this.data=data;
      
    })
}
}
