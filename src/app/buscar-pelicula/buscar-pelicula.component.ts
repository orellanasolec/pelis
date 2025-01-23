import { Component, OnInit } from '@angular/core';
import { BarraComponent } from '../barra/barra.component';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../service/api.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { idService } from '../id.service';

@Component({
  selector: 'app-buscar-pelicula',
  standalone:true,
  imports:[BarraComponent,FormsModule,CommonModule],
  templateUrl: './buscar-pelicula.component.html',
  styleUrl: './buscar-pelicula.component.css'
})
export class BuscarPeliculaComponent implements OnInit{
  
  errorMessage: string="";
  idPelicula:number=0;
  data:any[]=[];
  


  constructor(private apiService: ApiService, private authService:AuthService,private router: Router,private route: ActivatedRoute,private idservice:idService){
    this.route.paramMap.subscribe(params => {
      const idString = params.get('id');  // Obtiene el parámetro 'id' como string o null
  
      if (idString !== null) {
        this.idPelicula = parseInt(idString);
      } else {
        // Manejar el caso en el que el parámetro 'id' no está presente
        this.idPelicula = 0; // O cualquier valor predeterminado que desees
      }
  
    });
  }



  
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

ngOnInit(): void {
  this.idPelicula = this.idservice.getId();
  this.buscarPelicula();
}

}
