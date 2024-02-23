import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ImagenesComponent } from './imagenes/imagenes.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,ImagenesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'imagenes';
}
