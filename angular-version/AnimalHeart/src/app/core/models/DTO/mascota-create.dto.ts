
export interface MascotaCreateDTO {
  nombre: string;
  raza: string;
  edad: number;
  tipo: string;
  enfermedad: string;
  peso: number;
  fotoURL?: string;   
  activo: boolean;
  clienteId: number;  
}