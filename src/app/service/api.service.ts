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
      

    modificarPelicula(id: string, nombre: string, descripcion: string, duracion: string, imagen: string, puntuacion: number, idCategoria: number) {
      const body = { nombre, descripcion, duracion, imagen, idCategoria };
    
      
      this.http.patch(`${this.url}/${id}`, body, {
        headers: { 'Content-Type': 'application/json' }
      }).subscribe(
        response => {
          console.log("Respuesta del servidor:", response);
        },
        error => {
          console.error("Error al enviar la solicitud:", error);
        }
      );
    }
    
}
