// medicamentos.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Medicamento } from '../models/medicamento.model';
import { MedicamentoDTO } from '../models/DTO/medicamento-dto';

@Injectable({ providedIn: 'root' })
export class MedicamentosService {
  
  private readonly API_URL = 'http://localhost:8080/api/medicamentos';

  constructor(private http: HttpClient) {}

  // Función para obtener todos los medicamentos desde el backend
  getAll(): Observable<Medicamento[]> {
    return this.http.get<Medicamento[]>(this.API_URL);
  }

  // Función para obtener un medicamento por ID
  getById(id: number): Observable<Medicamento> {
    return this.http.get<Medicamento>(`${this.API_URL}/${id}`);
  }

  // Función para crear un medicamento en el backend
  create(medicamento: MedicamentoDTO): Observable<Medicamento> {
    return this.http.post<Medicamento>(this.API_URL, medicamento, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Función para actualizar un medicamento
  update(id: number, medicamento: MedicamentoDTO): Observable<void> {
    return this.http.put<void>(`${this.API_URL}/${id}`, medicamento);
  }

  // Función para eliminar un medicamento
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}