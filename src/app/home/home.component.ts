import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../service/api.service';
import { Observable } from 'rxjs';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { TimerService } from '../timer.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ CommonModule,RouterModule,FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  constructor(private apiService: ApiService, private router: Router,private timerService: TimerService ){}


  usuario: string = '';
  password: string = '';


  errorMessage: string = '';

  ngOnInit(): void {
    this.llenarData();
    this.sortMoviesByRating()
  }

  data:any[]=[];

  llenarData(){
    this.apiService.getData().subscribe(data =>{
      this.data=data;
      this.sortMoviesByRating()
      console.log('ID de la categoría:', data.nombre);
      
    })
  }

  darLike(peliculaId: number): void {
    
    this.apiService.darLike(peliculaId).subscribe({
      next: (response) => {
        console.log('Like enviado:', response);
        this.llenarData();
      },
      error: (error) => {
        console.error('Error al dar like:', error);
        this.errorMessage = 'Hubo un error al dar like.';
      }

      
     
    });
   


  }
  sortMoviesByRating(): void {
    this.data.sort((a, b) => b.puntuacion - a.puntuacion);  
  }

  onSubmit() {
    if (this.usuario && this.password) {
      this.errorMessage = '';
      this.apiService.login(this.usuario, this.password).subscribe({
        next: (response) => {
          console.log('Respuesta del servidor:', response);
          console.log("respuesta del servidor mía: "+response.token)
          const token=response.token
          localStorage.setItem('token', token);
          this.timerService.initializeTimerFromToken();

          this.router.navigate(['/eliminarPelicula']);
       
          
        },
        error: (error) => {
          alert("Datos incorrectos")
          console.error('Error al enviar los datos:', error);
          this.errorMessage = 'Ocurrió un error al intentar iniciar sesión.';
        }
      });
    } else {
      alert('Por favor, complete todos los campos.');
    }

    
}}
