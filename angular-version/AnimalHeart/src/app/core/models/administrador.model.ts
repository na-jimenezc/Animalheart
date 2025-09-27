import type { Veterinario } from './veterinario.model';

//CHECK BACKEND
export interface Administrador {
  id?: number;
  nombre: string;
  correo: string;
  clave?: string;

  veterinarios?: Veterinario[];
}
