import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-ganancias-totales',
  templateUrl: './ganancias-totales.html',
  styleUrls: ['./ganancias-totales.css']
})
export class GananciasTotales {
  @Input() ventasTotales: number = 0;
  @Input() gananciasTotales: number = 0;
  @Input() loading: boolean = false;
}