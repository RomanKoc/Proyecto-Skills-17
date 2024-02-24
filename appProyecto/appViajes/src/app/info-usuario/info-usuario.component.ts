import { Component } from '@angular/core';
import { ApiPruebaService } from '../api-prueba.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-info-usuario',
  standalone: true,
  imports: [],
  templateUrl: './info-usuario.component.html',
  styleUrl: './info-usuario.component.css'
})

export class InfoUsuarioComponent {

  userId = '0';
  usuario: any = {};
  usuarios: any;

  ngOnInit(): void {
    if (localStorage.getItem('userId')) {
      this.userId = localStorage.getItem('userId') ?? '0';
    } else {
      this.userId = 'not';
    }
  }

  constructor(private usuariosService: ApiPruebaService, private router: Router) {
    this.usuariosService.retornar()
      .subscribe((result) => {
        /* console.log('result -> ', result); */
        this.usuarios = result;
        this.usuarios.forEach((user: any) => {
          if (user.id == this.userId) {
            this.usuario = user;
            console.log('usuario -> ', this.usuario);
            return;
          }
        });

      });
  }
  cerrarSesion() {
    localStorage.removeItem('userId');
    this.userId = 'not';
  }
  borrarUsuario() {
    const usuario = {
      id: this.userId,
    };
    this.usuariosService.borrar(usuario)
      .subscribe({
        next: (response) => {
          console.log('Usuario BORRADO correctamente:', response);
          this.cerrarSesion();
          this.router.navigate(['/']).then(() => {
            window.location.reload();
          });
        },
        error: (error) => {
          console.error('Error al BORRAR usuario:', error);
          alert('Error al BORRAR usuario');
        }
      })
  };
}
