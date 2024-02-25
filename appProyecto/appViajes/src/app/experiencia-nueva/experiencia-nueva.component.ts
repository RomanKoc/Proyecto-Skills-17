import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators, FormsModule, MaxLengthValidator } from '@angular/forms';
import { ExperienciasService } from '../experiencias.service';
import { LocalizacionService } from '../localizacion.service';
import { ImagenesService } from '../imagenes.service';
import { SubcategoriasService } from '../subcategorias.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-experiencia-nueva',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, NgClass],
  templateUrl: './experiencia-nueva.component.html',
  styleUrl: './experiencia-nueva.component.css'
})
export class ExperienciaNuevaComponent {
  userId: any;
  localizaciones: any;
  categorias: any;
  subcategorias: any;
  categoriaSeleccionada: any;

  formularioExperiencia = new FormGroup({
    titulo: new FormControl('', [Validators.required]),
    texto: new FormControl('', [Validators.required]),
    puntuacion: new FormControl('', [Validators.required]),
    fecha: new FormControl('', [Validators.required]),
    localizacion: new FormControl(''),
    subcategoria: new FormControl(''),
  });

  determinarInputs(inputControl: any) {
    return inputControl.errors?.["required"] ? 'is-invalid' : 'is-valid';
  }

  constructor(private localizacionService: LocalizacionService, private experienciaService: ExperienciasService,
    private subcategoriaService: SubcategoriasService) {
    this.localizacionService.retornar()
      .subscribe((result) => {
        this.localizaciones = result;
        /* console.log('localizaciones -> ', this.localizaciones); */
      });

    this.subcategoriaService.retornar()
      .subscribe((result) => {
        this.subcategorias = result;
        console.log('subcategorias -> ', this.subcategorias);
      });
  }

  ngOnInit(): void {
    this.userId = localStorage.getItem('userId');
    console.log('userId -> ', this.userId);
  }

  sacarIdLocalizacion(localizacionFORM: any) {
    const localizacionEncontrada = this.localizaciones.find((local: any) => localizacionFORM == local.nombre);
    if (localizacionEncontrada) {
      console.log('localizacionEncontrada.codigo ->', localizacionEncontrada.codigo);
      return localizacionEncontrada.codigo;
    }
    return 1;

  }

  registrarExperiencia() {
    console.log(this.formularioExperiencia.value.localizacion);
    const idloc = this.sacarIdLocalizacion(this.formularioExperiencia.value.localizacion);
    console.log('idlocccccc -> ', idloc);
    const experiencia = {
      titulo: this.formularioExperiencia.value.titulo,
      texto: this.formularioExperiencia.value.texto,
      puntuacion: this.formularioExperiencia.value.puntuacion,
      fecha: this.formularioExperiencia.value.fecha,
      usuarioId: this.userId,
      localizacionId: idloc,
      subcategoriaId: 1,
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

  onSelectCategoria(categoriaId: number) {
    const categoria = this.categorias.find((c: any) => c.id === categoriaId);
    this.subcategorias = categoria ? categoria.subcategorias : [];
  }
}