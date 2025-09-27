import type { Mascota } from './mascota.model';


//CHECK BACKEND
export interface Cliente {
  id?: number;
  cedula: string;
  nombre: string;
  correo: string;
  celular: string;

  mascotas?: Mascota[];
}
