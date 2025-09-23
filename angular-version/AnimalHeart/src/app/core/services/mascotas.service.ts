import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Mascota } from '../models/mascota.model';
import { MASCOTAS_SEED } from '../data/mascotas.seed';

@Injectable({ providedIn: 'root' })
export class MascotasService {
  private readonly _state = new BehaviorSubject<Mascota[]>([...MASCOTAS_SEED]);
  readonly state = this._state.asObservable();

  /** acceso sincrónico al array */
  list(): Mascota[] {
    return this._state.value;
  }

  findById(id: string): Mascota | undefined {
    return this._state.value.find(m => m.id === id);
  }

  /** generador simple de id local */
  private newId(): string {
    return 'm' + Math.random().toString(36).slice(2, 8);
  }

  create(input: Omit<Mascota, 'id'>): Mascota {
    const nuevo: Mascota = { ...input, id: this.newId() };
    this._state.next([nuevo, ...this._state.value]);
    return nuevo;
  }

  update(id: string, changes: Partial<Mascota>): void {
    this._state.next(
      this._state.value.map(m => (m.id === id ? { ...m, ...changes } : m))
    );
  }

  delete(id: string): void {
    this._state.next(this._state.value.filter(m => m.id !== id));
  }

  // alias para compatibilidad con páginas que llaman getById
  getById(id: string) {
    return this.findById(id);
  }
}
