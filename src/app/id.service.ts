import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class idService {
  idPelicula: string="";

  setId(id: string) {
    this.idPelicula = id;
  }

  getId() {
   if(this.idPelicula=="")
    this.idPelicula="0";

    return parseInt(this.idPelicula);
  }
}
