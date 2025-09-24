import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Veterinario } from '../models/veterinario.model';
import { VETERINARIOS_SEED } from '../data/veterinarios.seed';

@Injectable({ providedIn: 'root' })
export class VeterinarioService {
  private veterinarios = VETERINARIOS_SEED;

  private veterinarioSubject = new BehaviorSubject<Veterinario | null>(null); //Acá se guarda el veterinario logeado
  veterinario$ = this.veterinarioSubject.asObservable();

  //Función para validar las credenciales del veterinario y guardar el veterinario
  validarCredenciales(usuario: string, contrasena: string): Veterinario | null {
    const vet = this.veterinarios.find(
      v => v.nombreUsuario === usuario && v.contrasena === contrasena
    ) || null;

    if (vet) {
      this.veterinarioSubject.next(vet); 
    }

    return vet;
  }

  //Función del logout
  logout(): void {
    this.veterinarioSubject.next(null);
  }
}
