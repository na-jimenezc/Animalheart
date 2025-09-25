import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cliente } from '../models/cliente.model';
import { CLIENTES_SEED } from '../data/clientes.seed';

const STORAGE_KEY = 'clientesData';

@Injectable({ providedIn: 'root' })
export class ClienteService {
  private readonly _clientes = new BehaviorSubject<Cliente[]>(this.loadInitialData());
  readonly clientes$ = this._clientes.asObservable();

  // Nueva función para cargar datos iniciales
  private loadInitialData(): Cliente[] {
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
    return [...CLIENTES_SEED];
  }

  // Nueva función para guardar en localStorage
  private saveToStorage(clientes: Cliente[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(clientes));
    } catch (error) {
      console.error('Error al guardar en localStorage:', error);
    }
  }

  obtenerTodos(): Cliente[] {
    return this._clientes.value;
  }

  obtenerPorId(id: string): Cliente | undefined {
    return this._clientes.value.find(c => c.id === id);
  }

  // Método para agregar si necesitas crear clientes también
  crearCliente(cliente: Omit<Cliente, 'id'>): Cliente {
    const nuevoCliente: Cliente = {
      ...cliente,
      id: 'c' + (this._clientes.value.length + 1)
    };
    const newList = [...this._clientes.value, nuevoCliente];
    this._clientes.next(newList);
    this.saveToStorage(newList); 
    return nuevoCliente;
  }
}