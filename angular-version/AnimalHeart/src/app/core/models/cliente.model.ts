import type { Mascota } from './mascota.model';

export interface Cliente {
  id?: string;
  cedula: string;
  nombre: string;
  correo: string;
  celular: string;

  mascotas?: Mascota[];
}
