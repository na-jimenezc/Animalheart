/** Dueño/cliente */
export interface Cliente {
  id?: number;
  cedula: string;
  nombre: string;
  correo: string;
  celular: string;

  /** relación 1-N con mascotas (ids para evitar ciclos) */
  mascotaIds?: number[];
}
