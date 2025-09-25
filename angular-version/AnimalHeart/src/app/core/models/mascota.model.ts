export type TipoMascota = 'Perro' | 'Gato';

import type { Cliente } from './cliente.model';

export interface Mascota {
  id: string;
  nombre: string;
  tipo: TipoMascota;
  raza: string;
  edad: number;
  enfermedad: string;
  peso: number;
  fotoUrl?: string;
  activo: boolean;

  cliente: Cliente;
}
