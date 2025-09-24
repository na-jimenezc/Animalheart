/** Tratamiento aplicado a una mascota */
export interface Tratamiento {
  id?: string;
  fecha: Date;
  cantidadUsada: number;

  /** relaciones */
  mascotaId: string;
  medicamentoId: string;
  veterinarioId: string;
}
