

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap, catchError, throwError } from 'rxjs';
import { ApiService } from '../service/api.service'; 


export interface Pelicula {
  id: number;
  nombre: string;
  descripcion: string;
  duracion: number;
  imagen: string;
  puntuacion?: number;
  idCategoria: number;
}

@Injectable({
  providedIn: 'root'
})
export class PeliculasStateService {

  
  private readonly peliculasSubject = new BehaviorSubject<Pelicula[]>([]);
  

  public readonly peliculas$: Observable<Pelicula[]> = this.peliculasSubject.asObservable();


  constructor(private apiService: ApiService) { }


  public cargarPeliculas(): Observable<Pelicula[]> {
    return this.apiService.getData().pipe(
      tap(peliculas => {
        this.peliculasSubject.next(peliculas); 
      }),
      catchError(this.handleError) 
    );
  }

  public eliminarPelicula(id: number): Observable<any> {
    return this.apiService.eliminarPelicula(id).pipe(
      tap(() => {
     
        const listaActual = this.peliculasSubject.getValue();
        const nuevaLista = listaActual.filter(p => p.id !== id);
        this.peliculasSubject.next(nuevaLista);

      
      }),
      catchError(this.handleError)
    );
  }


  public modificarPelicula(id: string, datos: any): Observable<any> {
   
    return this.apiService.modificarPelicula(id, datos).pipe(
      tap(() => {
        console.log("Modificación exitosa, recargando lista...");
        this.cargarPeliculas().subscribe();
      }),
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    console.error('Ocurrió un error en el servicio de estado:', error);
    return throwError(() => new Error('Algo salió mal; por favor, inténtelo de nuevo más tarde.'));
  }
}