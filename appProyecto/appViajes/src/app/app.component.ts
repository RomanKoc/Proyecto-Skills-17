import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ApiPruebaService } from './api-prueba.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  userId = '0';
  usuarios: any;
  usuario: any;

  /* comprobar si hay sesion en storage */
  ngOnInit(): void {
    if (localStorage.getItem('userId')) {
      this.userId = localStorage.getItem('userId') ?? '0';
    } else {
      this.userId = 'not';
    }
  }

  cerrarSesion() {
    localStorage.removeItem('userId');
    this.userId = 'not';
    this.router.navigate(['/']);
  }

  /* busco usuario en api, le comparo con id del sotrage y  */
  constructor(private usuariosService: ApiPruebaService, private router: Router) {
    this.usuariosService.retornar()
      .subscribe((result) => {
        console.log('result -> ', result);
        this.usuarios = result;
        if (this.userId != 'not') {
          this.usuarios.forEach((user: any) => {
            if (user.id == this.userId) {
              this.usuario = user;
            }
          });
        }
      });
  }
}
