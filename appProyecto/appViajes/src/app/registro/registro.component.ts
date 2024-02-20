import { Component } from '@angular/core';
import { ApiPruebaService } from '../api-prueba.service';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import * as CryptoJS from 'crypto-js'; // Importar crypto-js


@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {

  constructor(private usuarioService: ApiPruebaService) { }

  formularioRegistro = new FormGroup({
    nombre: new FormControl(''),
    apellidos: new FormControl(''),
    mail: new FormControl(''),
    password: new FormControl(''),
    ciudad: new FormControl(''),
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
    this.usuarioService.insertarUsuario(this.formularioRegistro.value)
      .subscribe(
        (response) => {
          console.log('Usuario insertado correctamente:', response);
          // Aquí puedes redirigir a otra página o mostrar un mensaje de éxito
        },
        (error) => {
          console.error('Error al insertar usuario:', error);
          // Aquí puedes manejar el error, por ejemplo, mostrando un mensaje de error al usuario
        }
      );
  }
}