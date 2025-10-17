import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface TopTratamiento {
  medicamento: string;
  unidadesVendidas: number;
}

@Component({
  selector: 'app-top3-tratamientos',
  templateUrl: './top3-tratamientos.html',
  styleUrls: ['./top3-tratamientos.css'],
  imports: [CommonModule],
  standalone: true,
})
export class Top3Tratamientos {
  @Input() top3Tratamientos: TopTratamiento[] = [];
  @Input() loading: boolean = false;
}