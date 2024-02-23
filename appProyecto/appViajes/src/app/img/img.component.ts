import { Component, OnInit } from '@angular/core';
import { NgForm, ReactiveFormsModule } from '@angular/forms';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ImgService } from '../img.service';

@Component({
  selector: 'app-img',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './img.component.html',
  styleUrl: './img.component.css'
})
export class ImgComponent {
  /* selectedFile: File = null ; */
  selectedFile: any;
  constructor(private imgServicio: ImgService) { }

  formImg = new FormGroup({
    imagen: new FormControl('')
  });

  cargarImagen(event: any) {
    console.log('cargarImagen');
    this.selectedFile = <File>event.target.files[0]
  }

  enviarImagen() {
    console.log('enviarImagen');
    this.imgServicio.onUpload(this.selectedFile);
  }

  /* enviarImagen():void {
    this.imgServicio.onUpload(this.selectedFile).subscribe({
      next: (response) => {
        console.log('Imagen insertada correctamente:', response);
      },
      error: (error) => {
        console.error('Error al insertar imagen:', error);
        alert('Error al insertar imagen');
      }
    });

  } */
}
