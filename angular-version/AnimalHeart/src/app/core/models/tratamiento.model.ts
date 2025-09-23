/** Tratamiento aplicado a una mascota */
export interface Tratamiento {
  id?: number;
  fecha: string;
  cantidadUsada: number;

  /** relaciones */
  mascotaId: number;
  medicamentoId: number;
  veterinarioId: number;
}
