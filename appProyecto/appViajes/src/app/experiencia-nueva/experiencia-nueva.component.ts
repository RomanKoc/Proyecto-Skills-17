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
    /* esto esta mal arreglar */
    nombre: new FormControl(''),
    email: new FormControl(''),
    mensaje: new FormControl('')
  });
}
