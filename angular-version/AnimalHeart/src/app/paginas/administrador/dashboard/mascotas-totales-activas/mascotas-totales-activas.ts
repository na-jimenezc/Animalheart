import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-mascotas-totales-activas',
  templateUrl: './mascotas-totales-activas.html',
  styleUrls: ['./mascotas-totales-activas.css']
})
export class MascotasTotalesActivas {
  @Input() totalMascotas: number = 0;
  @Input() mascotasActivas: number = 0;
  @Input() loading: boolean = false;
}