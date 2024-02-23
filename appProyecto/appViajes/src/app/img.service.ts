import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ImgService {


  public url: string;

  constructor(
    public _http: HttpClient,
  ) {
    this.url = 'http://127.0.0.1:8000/imagen/new';
  }


  onUpload(file: any): void {
    console.log('upload imagen????');
    const fd = new FormData;
    fd.append('image', file, file.name);
    const post = this._http.post(this.url, fd);
    post.subscribe({
      next: (response) => {
        console.log('Imagen insertada correctamente:', response);
      },
      error: (error) => {
        console.error('Error al insertar imagen:', error);
        alert('Error al insertar imagen');
      }
    });
  }



}
