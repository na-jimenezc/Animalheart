import { Component } from '@angular/core';
import { TarjetaPrincipal } from '../tarjeta-principal/tarjeta-principal';
import { MisionVision } from '../mision-vision/mision-vision';
import { TarjetasServicios } from '../tarjetas-servicios/tarjetas-servicios';
import { CarruselOpiniones } from '../carrusel-opiniones/carrusel-opiniones';

@Component({
  selector: 'app-home',
  imports: [
    TarjetaPrincipal,
    MisionVision,
    TarjetasServicios,
    CarruselOpiniones
  ],
  templateUrl: './home.component.html', // ← Asegúrate que esta ruta sea correcta
  styleUrl: './home.component.css'
})
export class HomeComponent {
}