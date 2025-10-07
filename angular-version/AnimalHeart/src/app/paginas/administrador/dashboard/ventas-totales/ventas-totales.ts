import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-ventas-totales',
  templateUrl: './ventas-totales.html',
  styleUrls: ['./ventas-totales.css']
})
export class VentasTotales {
  @Input() ventasTotales: number = 0;
  @Input() loading: boolean = false;
}