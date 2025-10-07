import { Component, Input } from '@angular/core';

export interface TratamientoMedicamento {
  medicamento: string;
  cantidad: number;
}

@Component({
  selector: 'app-tratamientos-tipo-medicamento',
  templateUrl: './tratamientos-tipo-medicamento.html',
  styleUrls: ['./tratamientos-tipo-medicamento.css']
})
export class TratamientosTipoMedicamento {
  @Input() tratamientosPorMedicamento: TratamientoMedicamento[] = [];
  @Input() loading: boolean = false;
}