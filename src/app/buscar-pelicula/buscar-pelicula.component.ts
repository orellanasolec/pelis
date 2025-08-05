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
  


  constructor(private apiService: ApiService, private router: Router,private route: ActivatedRoute,private idservice:idService){
    this.route.paramMap.subscribe(params => {
      const idString = params.get('id');  
  
      if (idString !== null) {
        this.idPelicula = parseInt(idString);
      } else {
       
        this.idPelicula = 0;
      }
  
    });
  }



  
buscarPelicula(id:number): void {

   this.idPelicula=id;
  this.data = [];
  this.errorMessage="";
  if(this.idPelicula!=0){
  this.apiService.buscarPelicula(this.idPelicula).subscribe(

    (data) => {
      this.data = [data];
    
    },
    (error) => {
    
      this.errorMessage = error.error?.message;
    
    }
  );
}}

ngOnInit(): void {
  this.idPelicula = this.idservice.getId();
  this.buscarPelicula(this.idPelicula);
}




}
