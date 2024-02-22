import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ExperienciasService } from '../experiencias.service';
import { ApiImagenService } from '../api-imagen.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-experiencia-individual',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './experiencia-individual.component.html',
  styleUrl: './experiencia-individual.component.css'
})
export class ExperienciaIndividualComponent {

  id = '0';
  experiencias: any = [];
  experienciaUsuario: any;
  imagenes: any = [];

  constructor(private router: Router, private experienciaServ: ExperienciasService,
    private apiImagen: ApiImagenService, private parametroRuta: ActivatedRoute) {

    this.experienciaServ.retornar()
      .subscribe((result) => {
        console.log('result -> ', result);
        this.experiencias = result;
      });

    this.apiImagen.retornar()
      .subscribe((resultado: any) => {
        /* console.log('result -> ', resultado); */
        this.imagenes = resultado
      });
    this.parametroRuta.paramMap.subscribe((params: ParamMap) => {
      console.log('params -> ', params.get('id'));
      this.id = params.get('id')! // obtiene id de la ruta

    });
    this.obtenerExperiencia(this.id);
  }
  /* ME QUEDA LA EXPERIENCIA */
  obtenerExperiencia(id: any) {
    console.log('id experiencia -> ', id);
    const experieciaIndividual = this.experiencias.find((exp: any) => exp.usuario.id == id);
    console.log('experieciaIndividual -> ', experieciaIndividual);
    if (experieciaIndividual) {
      this.experienciaUsuario = experieciaIndividual;
      return;
    }
    this.experienciaUsuario = '-1';
    return;
  }
}

