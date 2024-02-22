import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-experiencia-nueva',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './experiencia-nueva.component.html',
  styleUrl: './experiencia-nueva.component.css'
})
export class ExperienciaNuevaComponent {
  formularioContacto = new FormGroup({
    nombre: new FormControl(''),
    apellido: new FormControl(''),
    email: new FormControl(''),
    telefono: new FormControl(''),
    mensaje: new FormControl(''),
    titulo: new FormControl(''),
    fecha: new FormControl(''),
    texto: new FormControl(''),
    categoria: new FormControl(''),
    subcategoria: new FormControl(''),
    provincias: new FormControl(''),
    comunidades: new FormControl(''),
    localizacion: new FormControl('')
  });
}
