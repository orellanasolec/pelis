import { Component, OnInit } from '@angular/core';
import { BarraComponent } from '../barra/barra.component';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../service/api.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buscar-pelicula',
  standalone:true,
  imports:[BarraComponent,FormsModule,CommonModule],
  templateUrl: './buscar-pelicula.component.html',
  styleUrl: './buscar-pelicula.component.css'
})
export class BuscarPeliculaComponent{

  constructor(private apiService: ApiService, private authService:AuthService,private router: Router){}


  errorMessage: string="";



  idPelicula:number=0;
  data:any[]=[];


  
buscarPelicula(): void {
  if(this.authService.isTokenExpired()){
    alert("la sesión expiró")
    this.authService.logout()
    this.router.navigate(['/home']);
  
   }
  if (this.idPelicula<1) {
    alert("Por favor ingresa un ID válido.");
    return;
  }
  this.data = [];
  this.errorMessage="";
  this.apiService.buscarPelicula(this.idPelicula).subscribe(

    (data) => {
      this.data = [data];
      console.log('Película encontrada:', this.data); // Ver en la consola
    },
    (error) => {
      // Imprime el mensaje de error proveniente del backend
      this.errorMessage = error.error?.message;
      console.error(this.errorMessage);
    }
  );
}

}
