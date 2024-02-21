import { Component } from '@angular/core';
import { ApiPruebaService } from '../api-prueba.service';
import { ApiImagenService } from '../api-imagen.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bienvenida',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bienvenida.component.html',
  styleUrl: './bienvenida.component.css'
})
export class BienvenidaComponent {

  articulos: any;
  imagenes!: any;
  img: any;

  constructor(private usuarios: ApiPruebaService, private imagenesA: ApiImagenService) {
    this.usuarios.retornar()
      .subscribe((result) => {
        /* console.log('result -> ', result); */
        this.articulos = result
      });
    this.imagenesA.retornar()
      .subscribe((resultado: any) => { // Explicitly specify the type of 'resultado' parameter as 'any'
        /* console.log('result -> ', resultado); */
        this.imagenes = resultado
        this.img = this.imagenes[0].nombre;
      });
  }
}
