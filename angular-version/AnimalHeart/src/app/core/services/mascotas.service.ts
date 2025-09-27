import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Mascota } from '../models/mascota.model';

import { HttpClient, HttpParams } from '@angular/common/http';
import { MascotaCreateDTO } from '../models/DTO/mascota-create.dto';
import { MascotaUpdateDTO } from '../models/DTO/mascota-update.dto';
import { MascotaDTO } from '../models/DTO/mascota-dto';

const STORAGE_KEY = 'mascotasData';

@Injectable({ providedIn: 'root' })
export class MascotasService {

  //Dirección del backend
  private readonly API_URL = 'http://localhost:8080/api/mascotas';
  private apiUrl = 'http://localhost:8080/api/mascotas';

  constructor(
    private http: HttpClient
  ) {}

  //Función para obtener todas las mascotas desde el backend
  getAll(): Observable<Mascota[]> {
    console.log('Haciendo request a:', `${this.API_URL}/todas`);
    return this.http.get<Mascota[]>(`${this.API_URL}/todas`).pipe(
      tap({
        next: (data) => console.log('Respuesta del backend:', data),
        error: (error) => console.error('Error en request:', error)
      })
    );
  }


  //Obtener mascota por ID
  getById(id: number): Observable<Mascota> {
    return this.http.get<Mascota>(`${this.API_URL}/${id}`);
  }

  //Función para crear una mascota en el backend con el DTO para que no explote
  create(dto: MascotaCreateDTO): Observable<MascotaDTO> {
    return this.http.post<MascotaDTO>(this.API_URL, dto, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  //Función para actualizar una mascota en el backend, SE REVISA EL fotoUrl c:
  update(id: number, dto: MascotaUpdateDTO): Observable<Mascota> {
      const payload = {
        ...dto,
        fotoURL: dto.fotoUrl || '', 
      };
      
      delete (payload as any).fotoUrl;
      console.log('Payload para update:', payload);
      return this.http.put<Mascota>(`${this.API_URL}/${id}`, payload);
    }

  //Función para desactivar una mascota en el backend
  desactivar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}/desactivar`);
  }

  //Función para eliminar una mascota
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }

  //Función para obtener las mascotas de un cliente específico
  getByCliente(clienteId: number): Observable<Mascota[]> {
    return this.http.get<Mascota[]>(`${this.API_URL}/cliente/${clienteId}`);
  }

  //Para encontrar por id
  findById(id: number): Observable<Mascota> {
    return this.http.get<Mascota>(`${this.API_URL}/${id}`);
  }



  /*
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

  /** acceso sincrónico al array 
  list(): Mascota[] {
    return this._state.value;
  }

  findById(id: string): Mascota | undefined {
    return this._state.value.find(m => m.id === id);
  }

  /** generador simple de id local 
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
  }*/
}