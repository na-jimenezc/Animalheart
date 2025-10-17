import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mascotas-totales-activas',
  templateUrl: './mascotas-totales-activas.html',
  styleUrls: ['./mascotas-totales-activas.css'],
  imports: [CommonModule],
  standalone: true,
})
export class MascotasTotalesActivas {
  @Input() totalMascotas: number = 0;
  @Input() mascotasActivas: number = 0;
  @Input() loading: boolean = false;
}