import { Mascota } from './mascota.model';
import { Medicamento } from './medicamento.model';
import { Veterinario } from './veterinario.model';

//CHECK BACKEND
export interface Tratamiento {
  id?: number;            
  fecha: string;        //TENER EN CUENTA QUE LLEGA COMO YYYY-MM-DD POR EL FORMATO DEL DATE EN EL JSON     
  cantidadUsada: number;
  mascota: Mascota;
  medicamento: Medicamento;
  veterinario: Veterinario;
}