import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, Subscription } from 'rxjs';
import jwt_decode from 'jwt-decode'; // Importar jwt-decode para decodificar el token
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  private timerSubject = new BehaviorSubject<string>(''); // Valor inicial en formato mm:ss
  timer$ = this.timerSubject.asObservable(); // Observable para suscribirse
  private countdownSubscription: Subscription | null = null; // Para manejar el intervalo
  private remainingTimeMs: number = 0; // Tiempo restante en milisegundos

  constructor(private router: Router) {
    this.initializeTimerFromToken(); // Inicializa el temporizador al crear el servicio
  }

  // Método para inicializar el temporizador desde el token
  public initializeTimerFromToken() {
    if (typeof window !== 'undefined' && window.localStorage) {
      const token = localStorage.getItem('token'); // Obtiene el token desde localStorage
      if (token) {
        try {
          const decodedToken: any = jwt_decode(token); // Decodifica el token
          const expirationTime = decodedToken.exp * 1000; // Convierte `exp` a milisegundos
          const timeRemaining = expirationTime - Date.now(); // Tiempo restante en milisegundos

          if (timeRemaining > 0) {
            this.startCountdown(expirationTime); // Inicia la cuenta regresiva con el tiempo de expiración

            // Programar el `setTimeout` para que se ejecute exactamente al mismo tiempo
            setTimeout(() => {
              localStorage.removeItem('token'); // Elimina el token
              alert('Sesión expirada, será redirigido al inicio.');
              this.router.navigate(['/']); // Redirige al inicio
            }, timeRemaining); // Tiempo restante exacto
          } else {
            console.error('El token ya expiró.');
            this.timerSubject.next('Expirada'); // Indica que ya expiró
          }
        } catch (error) {
          console.error('Error al decodificar el token:', error);
          this.timerSubject.next(''); // Marca como expirada si hay un error
        }
      } else {
        console.error('No se encontró ningún token en localStorage.');
        this.timerSubject.next(''); // Marca como expirada si no hay token
      }
    } else {
      console.warn('localStorage no está disponible en este entorno.');
      this.timerSubject.next(''); // Manejo seguro si `localStorage` no está disponible
    }
  }

  // Método para iniciar el temporizador
  public startCountdown(expirationTime: number) {
    this.remainingTimeMs = expirationTime - Date.now(); // Calcula el tiempo restante inicial

    // Si ya hay un intervalo en ejecución, lo limpiamos
    if (this.countdownSubscription) {
      this.countdownSubscription.unsubscribe();
    }

    // Usamos interval para ejecutar una acción cada segundo
    this.countdownSubscription = interval(1000).subscribe(() => {
      this.remainingTimeMs -= 1000; // Reducimos 1 segundo del tiempo restante

      if (this.remainingTimeMs <= 0) {
        this.timerSubject.next('Expirada'); // Enviamos "Expirada" cuando el tiempo se agota
        this.stopCountdown(); // Detenemos el intervalo
      } else {
        this.timerSubject.next(this.formatTime(this.remainingTimeMs)); // Actualizamos el tiempo formateado
      }
    });
  }

  // Método para detener el temporizador
  private stopCountdown() {
    if (this.countdownSubscription) {
      this.countdownSubscription.unsubscribe();
    }
  }

  // Método para formatear el tiempo restante en "mm:ss"
  private formatTime(timeMs: number): string {
    const minutes = Math.floor(timeMs / 60000); // Calcula los minutos
    const seconds = Math.floor((timeMs % 60000) / 1000); // Calcula los segundos restantes
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`; // Formato "mm:ss"
  }
}
