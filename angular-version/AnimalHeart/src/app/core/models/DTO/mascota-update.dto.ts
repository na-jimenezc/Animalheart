export interface MascotaUpdateDTO {
  nombre: string;
  tipo: string;
  raza: string;
  enfermedad: string;
  fotoUrl?: string; 
  activo: boolean;
}