import { Component } from '@angular/core';
import { ApiPruebaService } from '../api-prueba.service';

@Component({
  selector: 'app-info-usuario',
  standalone: true,
  imports: [],
  templateUrl: './info-usuario.component.html',
  styleUrl: './info-usuario.component.css'
})

export class InfoUsuarioComponent {

  userId = '0';
  usuario: any;

  ngOnInit(): void {
    this.userId = localStorage.getItem('userId') ?? '0';
  }

  constructor(private usuarios: ApiPruebaService) {
    this.usuarios.retornar()
      .subscribe((result) => {
        console.log('result -> ', result);
        this.usuario = result
      });
  }
}
