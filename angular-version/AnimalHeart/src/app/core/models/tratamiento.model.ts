import { Mascota } from './mascota.model';
import { Medicamento } from './medicamento.model';
import { Veterinario } from './veterinario.model';

export interface Tratamiento {
  id?: number;            
  fecha: string;
  cantidadUsada: number;
  mascota: Mascota;
  medicamento: Medicamento;
  veterinario: Veterinario;
}