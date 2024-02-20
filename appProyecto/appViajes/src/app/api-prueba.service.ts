import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiPruebaService {

  constructor(private http: HttpClient) { }
  retornar() {
    return this.http.get('http://127.0.0.1:8000/usuario/') // recupera un archivo JSON
  }
  insertarUsuario(usuario: any) {
    return this.http.post('http://tu-servidor.com/api/usuarios', usuario);
  }
}
