import { Injectable } from '@angular/core';
import { ApiService } from '../service/api.service';

@Injectable({
  providedIn: 'root'
})
export class BuscarPeliculaService {
  constructor(private apiService: ApiService) {}

  buscarPelicula(idPelicula: number) {
    return this.apiService.buscarPelicula(idPelicula);
  }
}
