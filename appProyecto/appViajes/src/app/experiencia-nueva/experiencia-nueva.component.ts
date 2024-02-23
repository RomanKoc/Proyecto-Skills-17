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

  /* , private router: Router */
  constructor(private experienciaService: ExperienciasService,
    private localizacionService: LocalizacionService,
    private imagenesService: ImagenesService) {
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
    localizacion: new FormControl(''),df
    subcategoria: new FormControl(''),
    imagen: new FormControl(''),
  });

  onFileChange(event: any): File {
    const file = event.target.files[0];
    return file;
  }

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
    const puntuacion = parseInt(this.formularioExperiencia.value.puntuacion || '0');
    const experiencia = {
      titulo: 'prueba2',
      texto: 'pruebatxt2',
      puntuacion: 5,
      fecha: '2024-01-01',
      usuarioId: this.userId,
      localizacionId: 1,
      subcategoriaId: 1,
    };
    const foto = {
      nombre: this.onFileChange(event),
      experienciaId: this.userId
    };
    /* this.experienciaService.insertarExperiencia(experiencia)
      .subscribe({
        next: (response) => {
          console.log('Experiencia insertada correctamente:', response);
        },
        error: (error) => {
          console.error('Error al insertar experienciA:', error);
          alert('Error al insertar experiencia');
        }
      }); */

    this.imagenesService.insertarImagen(foto)
      .subscribe({
        next: (response) => {
          console.log('Imagen insertada correctamente:', response);
        },
        error: (error) => {
          console.error('Error al insertar imagen:', error);
          alert('Error al insertar imagen');
        }
      });
    this.formularioExperiencia.reset();
  }

  /* 
  
    registrarExperiencia() {
    const experiencia = {
      titulo: 'prueba2',
      texto: 'pruebatxt2',
      puntuacion: 5,
      fecha: '2024-01-01',
      usuarioId: this.userId,
      localizacionId: 1,
      subcategoriaId: 1,
    };
    this.experienciaService.insertarExperiencia(experiencia)
      .subscribe({
        next: (response: any) => {
          console.log('Experiencia insertada correctamente:', response);
          const foto = {
            nombre: this.formularioExperiencia.value.imagen,
            experienciaId: response.id // Usamos el ID de la experiencia recién insertada
          };
          this.imagenesService.insertarImagen(foto)
            .subscribe({
              next: (imagenResponse: any) => {
                console.log('Imagen insertada correctamente:', imagenResponse);
                this.formularioExperiencia.reset();
              },
              error: (error: any) => {
                console.error('Error al insertar imagen:', error);
                alert('Error al insertar imagen');
              }
            });
        },
        error: (error: any) => {
          console.error('Error al insertar experiencia:', error);
          alert('Error al insertar experiencia');
        }
      });*/

}
