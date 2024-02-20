import { Component } from '@angular/core';
import { ApiPruebaService } from '../api-prueba.service';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import * as CryptoJS from 'crypto-js'; // Importar crypto-js

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private usuarioService: ApiPruebaService) { }

  formularioRegistro = new FormGroup({
    mail: new FormControl(''),
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
      mail: this.formularioRegistro.value.mail,
      password: this.formularioRegistro.value.password
    };
    this.usuarioService.insertarUsuario(usuario)
      .subscribe({
        next: (response) => {
          console.log('Usuario insertado correctamente:', response);
        },
        error: (error) => {
          console.error('Error al insertar usuario:', error);
        }
      });

    this.formularioRegistro.reset();
  }
}
