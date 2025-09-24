/** Médico veterinario */
export interface Veterinario {
  id?: string;
  nombre: string;
  especialidad: string;

  /** credenciales para la app */
  nombreUsuario: string;
  contrasena?: string;


  fotoUrl: string;
  aniosExperiencia: number;
  consultasAtendidas: number;
}
