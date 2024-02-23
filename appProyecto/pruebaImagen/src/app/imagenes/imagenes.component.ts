import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-imagenes',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './imagenes.component.html',
  styleUrl: './imagenes.component.css'
})
export class ImagenesComponent {
  urlImagen: string | ArrayBuffer | null = null;
  urlImagenSubida: string | ArrayBuffer | null = null;
  archivoSeleccionado: File | null = null;

  constructor(private http: HttpClient) { }

  previsualizarImagen(event: any): void {
    this.archivoSeleccionado = event.target.files[0];
    if (this.archivoSeleccionado) {
      const reader = new FileReader();
      reader.onload = e => this.urlImagen = reader.result;
      reader.readAsDataURL(this.archivoSeleccionado);
    }
  }
  subirImagen(): void {
    if (!this.archivoSeleccionado) {
      alert('Por favor, selecciona una imagen.');
      return;
    }

    const formData = new FormData();
    formData.append('imagen', this.archivoSeleccionado, this.archivoSeleccionado.name);

    this.http.post('http://127.0.0.1:8000/controllador/upload-image', formData).subscribe({
      next: (response: any) => {
        // Asumiendo que el servidor responde con la URL de la imagen almacenada
        //this.urlImagenSubida = "http://127.0.0.1:8000/" + response.urlImagen;
        this.urlImagenSubida = ("http://127.0.0.1:8000/" + response.urlImagen).trim();
        console.log('Imagen subida con éxito ' + this.urlImagenSubida);
      },
      error: (e) => console.error('Error al subir la imagen', e)
    });
  }

}
