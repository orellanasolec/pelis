import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";

@Injectable({
    providedIn: 'root',
  })
  export class AuthService {
    private apiUrl = 'https://tudominio/api/login'; // Cambia esto por tu URL de API
  
    constructor(private http: HttpClient) {}
  
    login(usuario: string, password: string): Observable<any> {
      return this.http.post(this.apiUrl, { usuario, password });
    }
  
    setToken(token: string): void {
      if (typeof window !== 'undefined') {  // Verifica si estamos en el navegador
        localStorage.setItem('token', token);
      }
    }
  
    getToken(): string | null {
      if (typeof window !== 'undefined') {  // Verifica si estamos en el navegador
        return localStorage.getItem('token');
      }
      return null;
    }
  
    logout(): void {
      if (typeof window !== 'undefined') {  // Verifica si estamos en el navegador
        localStorage.removeItem('token');
      }
    }
  
    isTokenExpired(): boolean {
      const token = this.getToken();
  
      if (!token) return true;
  
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const currentTime = Math.floor(Date.now() / 1000); // Tiempo actual en segundos
  
        return payload.exp < currentTime; // true si expiró
      } catch (error) {
        console.error('Error al decodificar el token:', error);
        return true; // Si ocurre un error, lo tratamos como expirado
      }
    }
  }
  