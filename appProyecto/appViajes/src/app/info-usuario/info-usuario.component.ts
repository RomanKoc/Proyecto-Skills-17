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
  usuarios: any;

  ngOnInit(): void {
    if (localStorage.getItem('userId')) {
      this.userId = localStorage.getItem('userId') ?? '0';
    } else {
      this.userId = 'not';
    }
  }

  constructor(private usuariosService: ApiPruebaService) {
    this.usuariosService.retornar()
      .subscribe((result) => {
        /* console.log('result -> ', result); */
        this.usuarios = result;
        this.usuarios.forEach((user: any) => {
          if (user.id == this.userId) {
            this.usuario = user;
            return;
          }
        });

      });
  }
}
