import { Component } from '@angular/core';
import { Servicio } from './servicio';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tarjetas-servicios',
  imports: [ CommonModule],
  templateUrl: './tarjetas-servicios.html',
  styleUrl: './tarjetas-servicios.css'
})

export class TarjetasServicios {
   servicios: Servicio[] = [
    {
      titulo: 'Consulta General',
      descripcionCorta: 'Cuidamos su salud desde el primer día.',
      descripcionCompleta: 'Nuestro equipo escucha cada latido y cada suspiro de tu mascota. ¡Aquí las colitas se mueven y los ronroneos florecen!',
      imagen: 'assets/images/servicio-consulta.webp',
      expandido: false
    },
    {
      titulo: 'Urgencias 24/7',
      descripcionCorta: 'Porque tu mejor amigo no tiene horario, nosotros tampoco.',
      descripcionCompleta: 'Sin importar si es de madrugada o domingo, estamos listos para saltar a la acción y devolverle la energía a tu peludo.',
      imagen: 'assets/images/servicio-urgencias.webp',
      expandido: false
    },
    {
      titulo: 'Vacunación',
      descripcionCorta: 'Una picadita de amor y protección.',
      descripcionCompleta: 'Cada vacuna es un escudo invisible que envuelve a tu amigo peludo para que pueda explorar el mundo sin preocupaciones.',
      imagen: 'assets/images/servicio-vacunacion.jpeg',
      expandido: false
    },
    {
      titulo: 'Farmacia',
      descripcionCorta: 'Medicinas y suplementos siempre al alcance.',
      descripcionCompleta: 'Desde jarabes que curan resfriados hasta golosinas medicinales que sanan sin lágrimas: todo para que tu peludo recupere su alegría.',
      imagen: 'assets/images/servicio-farmacia.jpg',
      expandido: false
    },
    {
      titulo: 'Hospitalización',
      descripcionCorta: 'Todo lo que necesita para sanar, en un solo lugar.',
      descripcionCompleta: 'Habitaciones cómodas, atención constante y cariño sin medida para que tu compañero se recupere rodeado de cuidado y calor.',
      imagen: 'assets/images/servicio-hospitalizacion.jpg',
      expandido: false
    },
    {
      titulo: 'Cirugía',
      descripcionCorta: 'Manos expertas, corazones dedicados.',
      descripcionCompleta: 'Con precisión, experiencia y una pizca de amor, devolvemos la salud a quienes más te importan.',
      imagen: 'assets/images/servicio-cirugia.webp',
      expandido: false
    }
  ];

    toggleServicio(index: number): void {
    this.servicios.forEach((s, i) => {
      s.expandido = i === index ? !s.expandido : false;
    });
  }
}
