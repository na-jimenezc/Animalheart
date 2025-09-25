import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Mascota } from '../models/mascota.model';
import { MASCOTAS_SEED } from '../data/mascotas.seed';

const STORAGE_KEY = 'mascotasData';

@Injectable({ providedIn: 'root' })
export class MascotasService {
  private readonly _state = new BehaviorSubject<Mascota[]>(this.loadInitialData());
  readonly state = this._state.asObservable();

  // Nueva función para cargar datos iniciales
  private loadInitialData(): Mascota[] {
    // Intentar cargar desde localStorage primero
    try {
      const storedData = localStorage.getItem(STORAGE_KEY);
      if (storedData) {
        return JSON.parse(storedData);
      }
    } catch (error) {
      console.warn('Error al cargar datos de localStorage, usando seed:', error);
    }
    // Si no hay datos almacenados, usar el seed
    return [...MASCOTAS_SEED];
  }

  // Nueva función para guardar en localStorage
  private saveToStorage(mascotas: Mascota[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(mascotas));
    } catch (error) {
      console.error('Error al guardar en localStorage:', error);
    }
  }

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
    const nuevo: Mascota = { 
      ...input, 
      id: this.newId(),
      activo: input.activo !== undefined ? input.activo : true
    };
    
    // Obtener el array actual de mascotas
    const mascotasActuales = this._state.value;
    
    // Agregar la nueva mascota al array existente (sin duplicar)
    const newList = [nuevo, ...mascotasActuales];
    this._state.next(newList);
    this.saveToStorage(newList); //  Guardar en localStorage
    return nuevo;
  }

  update(id: string, changes: Partial<Mascota>): void {
    const updatedList = this._state.value.map(m => 
      (m.id === id ? { ...m, ...changes } : m)
    );
    this._state.next(updatedList);
    this.saveToStorage(updatedList); // Guardar en localStorage
  }

  delete(id: string): void {
    const filteredList = this._state.value.filter(m => m.id !== id);
    this._state.next(filteredList);
    this.saveToStorage(filteredList); //Guardar en localStorage
  }

  // alias para compatibilidad con páginas que llaman getById
  getById(id: string) {
    return this.findById(id);
  }

  //Función para desactivar una mascota
  desactivar(id: string): void {
    this.update(id, { activo: false });
  }
}