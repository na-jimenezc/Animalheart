import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ventas-totales',
  templateUrl: './ventas-totales.html',
  styleUrls: ['./ventas-totales.css'],
  imports: [CommonModule],
  standalone: true,  

})
export class VentasTotales {
  @Input() ventasTotales: number = 0;
  @Input() loading: boolean = false;
}