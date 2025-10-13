export interface MascotaUpdateDTO {
  nombre: string;
  tipo: string;
  raza: string;
  enfermedad: string;
  fotoURL?: string; 
  activo: boolean;
}