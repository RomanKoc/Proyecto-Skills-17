import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { ExperienciasService } from '../experiencias.service';
import { LocalizacionService } from '../localizacion.service';
import { ImagenesService } from '../imagenes.service';
 
@Component({
  selector: 'app-experiencia-nueva',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './experiencia-nueva.component.html',
  styleUrl: './experiencia-nueva.component.css'
})
export class ExperienciaNuevaComponent {
  userId: any;
  localizaciones: any;
  subcategorias: any;
 
  formularioExperiencia = new FormGroup({
    titulo: new FormControl(''),
    texto: new FormControl(''),
    puntuacion: new FormControl(''),
    fecha: new FormControl(''),
    localizacion: new FormControl(''),
    subcategoria: new FormControl(''),
  });
 
  constructor(private localizacionService: LocalizacionService, private experienciaService: ExperienciasService) {
    this.localizacionService.retornar()
      .subscribe((result) => {
        this.localizaciones = result;
        console.log('localizaciones -> ', this.localizaciones[0].nombre);
      });
  }
 
  ngOnInit(): void {
    this.userId = localStorage.getItem('userId');
    console.log('userId -> ', this.userId);
  }
 
  registrarExperiencia() {
    console.log(this.formularioExperiencia.value.fecha);
 
    const experiencia = {
      titulo: this.formularioExperiencia.value.titulo,
      texto: this.formularioExperiencia.value.texto,
      puntuacion: this.formularioExperiencia.value.puntuacion,
      fecha: this.formularioExperiencia.value.fecha,
      usuarioId: this.userId,
      localizacionId: 1, // Aquí debes asignar el ID de la localización seleccionada
      subcategoriaId:1, // Aquí debes asignar el ID de la subcategoría seleccionada
    };
 
    this.experienciaService.insertarExperiencia(experiencia)
      .subscribe({
        next: (response) => {
          console.log('Experiencia insertada correctamente:', response);
        },
        error: (error) => {
          console.error('Error al insertar experiencia:', error);
          alert('Error al insertar experiencia');
        }
      });
 
    this.formularioExperiencia.reset();
  }
}