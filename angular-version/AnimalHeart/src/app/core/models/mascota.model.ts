// Tipos auxiliares
export type TipoMascota = 'Perro' | 'Gato';

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
  clienteId: string;
}
