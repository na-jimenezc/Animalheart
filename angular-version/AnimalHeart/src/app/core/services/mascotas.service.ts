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

  private readonly API_URL = 'http://localhost:8080/api/mascotas';
  private apiUrl = 'http://localhost:8080/api/mascotas';

  constructor(
    private http: HttpClient
  ) {}

  getAll(): Observable<Mascota[]> {
    console.log('Haciendo request a:', `${this.API_URL}/todas`);
    return this.http.get<Mascota[]>(`${this.API_URL}/todas`).pipe(
      tap({
        next: (data) => console.log('Respuesta del backend:', data),
        error: (error) => console.error('Error en request:', error)
      })
    );
  }

  getById(id: number): Observable<Mascota> {
    return this.http.get<Mascota>(`${this.API_URL}/${id}`);
  }

  create(dto: MascotaCreateDTO): Observable<MascotaDTO> {
    return this.http.post<MascotaDTO>(this.API_URL, dto, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  update(id: number, dto: MascotaUpdateDTO): Observable<Mascota> {
      const payload = {
        ...dto,
        fotoURL: dto.fotoURL || '', 
      };
      
      delete (payload as any).fotoUrl;
      console.log('Payload para update:', payload);
      return this.http.put<Mascota>(`${this.API_URL}/${id}`, payload);
    }

  desactivar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}/desactivar`);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }

  getByCliente(clienteId: number): Observable<Mascota[]> {
    return this.http.get<Mascota[]>(`${this.API_URL}/cliente/${clienteId}`);
  }

  findById(id: number): Observable<Mascota> {
    return this.http.get<Mascota>(`${this.API_URL}/${id}`);
  }
}