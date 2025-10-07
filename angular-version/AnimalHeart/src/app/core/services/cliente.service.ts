import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cliente } from '../models/cliente.model';
import { HttpClient } from '@angular/common/http';

const STORAGE_KEY = 'clientesData';

@Injectable({ providedIn: 'root' })
export class ClienteService {

  private apiUrl = 'http://localhost:8080/api/clientes';

  constructor(private http: HttpClient) {}

  

  // --- LOGIN ---
  loginCliente(correo: string, cedula: string): Observable<Cliente> {
    return this.http.post<Cliente>(`${this.apiUrl}/login`, { correo, cedula });
  }

  //Para obtener a todos los clientes
  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.apiUrl);
  }

  //Para obtener por id
  getClienteById(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.apiUrl}/${id}`);
  }

  //Para obtener por cédula
  getClienteByCedula(cedula: string): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.apiUrl}/cedula/${cedula}`);
  }

  //Para crear un nuevo cliente
  addCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.apiUrl, cliente);
  }

  //Para actualizar un cliente
  updateCliente(id: number, cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.apiUrl}/${id}`, cliente);
  }

  //Para eliminar un cliente
  deleteCliente(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  //Para obtener las mascotas de un cliente
  getMascotasByCliente(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${id}/mascotas`);
  }

  //Método para obtener todos los clientes 
  findAll(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.apiUrl);
  }

  /*
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
  }*/
}