import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Medicamento } from '../models/medicamento.model';
import { MedicamentoDTO } from '../models/DTO/medicamento-dto';

@Injectable({ providedIn: 'root' })
export class MedicamentosService {
  
  private readonly API_URL = 'http://localhost:8080/api/medicamentos';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Medicamento[]> {
    return this.http.get<Medicamento[]>(this.API_URL);
  }

  getById(id: number): Observable<Medicamento> {
    return this.http.get<Medicamento>(`${this.API_URL}/${id}`);
  }

  create(medicamento: MedicamentoDTO): Observable<Medicamento> {
    return this.http.post<Medicamento>(this.API_URL, medicamento, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  update(id: number, medicamento: MedicamentoDTO): Observable<void> {
    return this.http.put<void>(`${this.API_URL}/${id}`, medicamento);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
   verificarStock(id: number, cantidadRequerida: number): Observable<{ disponible: boolean, stockActual: number }> {
    return this.http.get<{ disponible: boolean, stockActual: number }>(
      `${this.API_URL}/${id}/verificar-stock?cantidad=${cantidadRequerida}`
    );
  }
}