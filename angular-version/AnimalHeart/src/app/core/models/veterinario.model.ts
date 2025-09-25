import type { Administrador } from './administrador.model';
import type { Mascota } from './mascota.model';

export interface Veterinario {
  id?: string;
  nombre: string;
  especialidad: string;

  nombreUsuario: string;
  contrasena?: string;

  fotoUrl: string;
  aniosExperiencia: number;
  consultasAtendidas: number;

  administrador?: Administrador;
  pacientes?: Mascota[];
}
