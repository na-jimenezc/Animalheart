import type { Tratamiento } from './tratamiento.model';

//CHECK BACKEND
export interface Medicamento {
  id?: number;              
  nombre: string;
  precioCompra: number;
  precioVenta: number;
  unidadesDisponibles: number;
  unidadesVendidas: number; 

  tratamientos?: Tratamiento[];
}

