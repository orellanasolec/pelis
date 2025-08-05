import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private url='https://backend-peliculas-5gdl.onrender.com/pelicula'; 

  constructor(private http: HttpClient) {
    }

    public getData():Observable<any>{
      return this.http.get<any>(this.url)
    }

    private urlLogin = 'https://backend-peliculas-5gdl.onrender.com/login';

    buscarPeliculaPorNombre(nombre: string) {
  return this.http.get<any[]>(`/api/peliculas?nombre=${encodeURIComponent(nombre)}`);
}
    darLike(peliculaId: number): Observable<any> {
      const url = `${this.url}/${peliculaId}/like`;
      return this.http.post(url, { like: true });
    }

    login(usuario: string, password: string): Observable<any> {
      const body = { usuario, password };
      return this.http.post(this.urlLogin, body);
    }
    
   
  
    buscarPelicula(id: number): Observable<any> {
      const token=localStorage.getItem('token')
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.get(`${this.url}/${id}`,{headers});
      }

  
      agregarPelicula(nombre: string, descripcion: string, duracion: number, imagen: string, categoriaId: number): Observable<any> {
        const body = { nombre, descripcion, duracion, imagen, categoriaId };
      
        return this.http.post<any>(this.url, body); 
      }

      eliminarPelicula(id: number): Observable<any> {

  
        return this.http.delete(`${this.url}/${id}`);
      }
      

modificarPelicula(id: string, datosPelicula: any): Observable<any> {
 
  return this.http.patch(`${this.url}/${id}`, datosPelicula, {
    headers: { 'Content-Type': 'application/json' }
  });
}
    
}
