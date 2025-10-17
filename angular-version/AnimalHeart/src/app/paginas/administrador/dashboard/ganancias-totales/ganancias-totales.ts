import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ganancias-totales',
  templateUrl: './ganancias-totales.html',
  styleUrls: ['./ganancias-totales.css'],
  imports: [CommonModule],
  standalone: true,
})
export class GananciasTotales {
  @Input() ventasTotales: number = 0;
  @Input() gananciasTotales: number = 0;
  @Input() loading: boolean = false;
}