import type { Administrador } from './administrador.model';
import type { Tratamiento } from './tratamiento.model';

export interface Veterinario {
  id?: number;            
  nombre: string;
  especialidad: string;
  nombreUsuario: string;
  contrasenia: string;      
  imagen: string;          
  activo: number;          
  consultas: number;      
  administradores?: Administrador[]; 
  tratamientos?: Tratamiento[];
}