/** Admin del sistema */
export interface Administrador {
  id?: number;
  nombre: string;
  correo: string;
  clave?: string;

  /** relación 1-N con veterinarios (ids para evitar ciclos) */
  veterinarioIds?: number[];
}
