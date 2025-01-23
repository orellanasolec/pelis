import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";


@Injectable({
    providedIn: 'root',
  })
  export class AuthService {
 
  
    constructor(private http: HttpClient) {}
  
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
  