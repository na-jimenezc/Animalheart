import { Component } from '@angular/core';
import { Testimonio } from './testimonio';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carrusel-opiniones',
  imports: [CommonModule],
  templateUrl: './carrusel-opiniones.html',
  styleUrl: './carrusel-opiniones.css'
})
export class CarruselOpiniones {
  testimonios: Testimonio[] = [
    {
      nombre: 'Milo',
      imagen: 'milo.jpeg',
      texto: 'Llevé a mi gato Milo a consulta general y quedé encantada con la atención. Lo revisaron con paciencia y cariño, y además pude conseguir en la farmacia todo lo que necesitaba. ¡Muy recomendado!',
      fecha: '12 de agosto del 2025'
    },
    {
      nombre: 'Iris',
      imagen: 'iris.jpeg',
      texto: 'Traje a Iris para su vacunación y la experiencia fue excelente. El equipo fue muy amable, la tranquilizó todo el tiempo y me dieron recomendaciones para su salud. Se nota que aman a los animales.',
      fecha: '12 de agosto del 2025'
    },
    {
      nombre: 'Tony',
      imagen: 'tony.jpeg',
      texto: 'Mi gato Tony necesitó atención de urgencias y en Animal Heart lo atendieron de inmediato. Me explicaron todo con claridad y lo dejaron hospitalizado hasta que estuvo mejor. Estoy muy agradecida por el cuidado que le dieron.',
      fecha: '12 de agosto del 2025'
    }
  ];
}
