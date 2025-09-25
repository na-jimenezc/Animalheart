export interface Medicamento {
  id?: string;
  nombre: string;
  precioCompra: number;
  precioVenta: number;
  unidadesDisponibles: number;

  meta?: number;
}
