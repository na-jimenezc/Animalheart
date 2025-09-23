/** Médico veterinario */
export interface Veterinario {
  id?: number;
  nombre: string;
  especialidad: string;

  /** credenciales para la app */
  nombreUsuario: string;
  contrasena?: string;
}
