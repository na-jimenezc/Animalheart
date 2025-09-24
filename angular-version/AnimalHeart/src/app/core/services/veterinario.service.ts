import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Veterinario } from '../models/veterinario.model';
import { VETERINARIOS_SEED } from '../data/veterinarios.seed';

@Injectable({ providedIn: 'root' })
export class VeterinarioService {
  private veterinarios = VETERINARIOS_SEED;

  //Función para simular el login de un veterinario
  validarCredenciales(usuario: string, contrasena: string): Veterinario | null {
    return this.veterinarios.find(
      v => v.nombreUsuario === usuario && v.contrasena === contrasena
    ) || null;
  }
}