export type TipoMascota = 'Perro' | 'Gato';

import type { Cliente } from './cliente.model';
import type { Tratamiento } from './tratamiento.model';

export interface Mascota {
  id?: number;            
  nombre: string;
  raza: string;
  edad: number;
  tipo: string;            
  enfermedad: string;
  peso: number;
  fotoURL?: string;       
  estado: string;         
  activo: boolean;
  cliente?: Cliente | null;
  clienteId?: number;
  tratamientos?: Tratamiento[];
}