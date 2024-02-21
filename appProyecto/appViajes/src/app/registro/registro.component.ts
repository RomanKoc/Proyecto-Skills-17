import { Component } from '@angular/core';
import { ApiPruebaService } from '../api-prueba.service';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import * as CryptoJS from 'crypto-js'; // Importar crypto-js
import { Router } from '@angular/router';


@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {

  constructor(private usuarioService: ApiPruebaService, private router: Router) { }

  formularioRegistro = new FormGroup({
    nombre: new FormControl(''),
    apellidos: new FormControl(''),
    mail: new FormControl(''),
    ciudad: new FormControl(''),
    password: new FormControl(''),
  });

  encriptarPasswd() {
    const passwordValue = this.formularioRegistro.value.password;
    if (passwordValue) {
      const passwordEncriptada = CryptoJS.SHA256(passwordValue).toString();
      // Actualiza el valor del campo password en el formulario:
      this.formularioRegistro.patchValue({ password: passwordEncriptada });
    }
  }
  registrarUsuario() {
    this.encriptarPasswd();
    const usuario = {
      nombre: this.formularioRegistro.value.nombre,
      apellidos: this.formularioRegistro.value.apellidos,
      mail: this.formularioRegistro.value.mail,
      ciudad: this.formularioRegistro.value.ciudad,
      password: this.formularioRegistro.value.password
    };
    this.usuarioService.insertarUsuario(usuario)
      .subscribe({
        next: (response) => {
          console.log('Usuario insertado correctamente:', response);
          this.router.navigate(['/login']).then(() => {
            window.location.reload();
          });
        },
        error: (error) => {
          console.error('Error al insertar usuario:', error);
          alert('Error al insertar usuario');
        }
      });

      this.formularioRegistro.reset();
  }
}