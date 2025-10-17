import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface TratamientoMedicamento {
  medicamento: string;
  cantidad: number;
}

@Component({
  selector: 'app-tratamientos-tipo-medicamento',
  templateUrl: './tratamientos-tipo-medicamento.html',
  styleUrls: ['./tratamientos-tipo-medicamento.css'],
  imports: [CommonModule],
  standalone: true
})
export class TratamientosTipoMedicamento {
  @Input() tratamientosPorMedicamento: TratamientoMedicamento[] = [];
  @Input() loading: boolean = false;
}