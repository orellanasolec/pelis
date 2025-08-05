import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../service/api.service';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  showModal: boolean = false;
  modalMessage: string = '';
  
  data: any[] = [];
errorMessage: any;

  constructor(
    private apiService: ApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
  
    this.llenarData();
  }


  llenarData(): void {
    this.apiService.getData().subscribe({
      next: (data) => {
        this.data = data;
        this.sortMoviesByRating();
      
      },
      error: (error) => {
      
      
        this.modalMessage = 'No se pudieron cargar las películas al iniciar.';
        this.showModal = true;
      }
    });
  }

  
  darLike(peliculaId: number): void {
    this.apiService.darLike(peliculaId).subscribe({
      next: (response) => {
      
        this.llenarData(); 
      },
      error: (error) => {
       
        this.modalMessage = error.error?.message || 'Hubo un error al dar like.';
        this.showModal = true;
      }
    });
  }

 
  sortMoviesByRating(): void {
    if (this.data) {
      this.data.sort((a, b) => b.puntuacion - a.puntuacion);
    }
  }


  entrar(): void {
    this.router.navigate(['/listarPeliculas']);
  }

  
  closeModal(): void {
    this.showModal = false;
  }
}