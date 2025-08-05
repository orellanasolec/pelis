import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-barra',
  standalone:true,
  imports:[RouterModule],
  templateUrl: './barra.component.html',
  styleUrls: ['./barra.component.css']
})
export class BarraComponent implements OnInit, OnDestroy {
  timerValue: string = ''; // Para mostrar el valor del temporizador
  private timerSubscription: Subscription | null = null;

  constructor(private router:Router) {}

  ngOnInit() {
  
  }

  ngOnDestroy() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe(); // Limpia la suscripción al destruir el componente
    }
  }

  cerrarSesion(){
   
    this.router.navigate(['/home']);

  }
}

