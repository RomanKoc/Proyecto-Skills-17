import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { ExperienciasService } from '../experiencias.service';
import { LocalizacionService } from '../localizacion.service';

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

  /* , private router: Router */
  constructor(private experienciaService: ExperienciasService,
    private localizacionService: LocalizacionService) {
    this.localizacionService.retornar()
      .subscribe((result) => {
        /* console.log('result -> ', result); */
        this.localizaciones = result;
        console.log('localizaciones -> ', this.localizaciones[0].nombre);
      });
  }

  ngOnInit(): void {
    this.userId = localStorage.getItem('userId');
    console.log('userId -> ', this.userId);
  }

  formularioExperiencia = new FormGroup({
    titulo: new FormControl(''),
    texto: new FormControl(''),
    puntuacion: new FormControl(''),
    fecha: new FormControl(''),
    /*     usuario_id: new FormControl(''), */
    localizacion: new FormControl(0),
    subcategoria: new FormControl(0),
  });

  registrarExperiencia() {
    /* const experiencia = {
      titulo: this.formularioExperiencia.value.titulo,
      texto: this.formularioExperiencia.value.texto,
      puntuacion: this.formularioExperiencia.value.puntuacion,
      fecha: this.formularioExperiencia.value.fecha,
      usuario_id: this.userId,
      localizacion_id: this.formularioExperiencia.value.localizacion,
      subcategoria_id: this.formularioExperiencia.value.subcategoria,
    }; */
    const experiencia = {
      titulo: 'prueba',
      texto: 'pruebatxt',
      /* puntuacion: 'prueba',
      fecha: '2024/01/01', */
      usuario_id: this.userId,
      /* localizacion_id: 1,
      subcategoria_id: 1, */
    };
    this.experienciaService.insertarExperiencia(experiencia)
      .subscribe({
        next: (response) => {
          console.log('Experiencia insertada correctamente:', response);
        },
        error: (error) => {
          console.error('Error al insertar experienciA:', error);
          alert('Error al insertar experiencia');
        }
      });
    this.formularioExperiencia.reset();
  }
}
