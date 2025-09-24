/** Inventario de farmacia */
export interface Medicamento {
  id?: string;
  nombre: string;
  precioCompra: number;
  precioVenta: number;
  unidadesDisponibles: number;

  /** campo libre que en la seed se pone como último argumento (reorden/u.m.) */
  meta?: number;
}
