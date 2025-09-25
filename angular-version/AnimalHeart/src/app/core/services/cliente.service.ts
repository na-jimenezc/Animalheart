// cliente.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cliente } from '../models/cliente.model';
import { CLIENTES_SEED } from '../data/clientes.seed';

@Injectable({ providedIn: 'root' })
export class ClienteService {
  private readonly _clientes = new BehaviorSubject<Cliente[]>([...CLIENTES_SEED]);
  readonly clientes$ = this._clientes.asObservable();

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
    this._clientes.next([...this._clientes.value, nuevoCliente]);
    return nuevoCliente;
  }
}