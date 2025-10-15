import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TratamientoService {
  private readonly API_URL = 'http://localhost:8080/api/tratamientos';

  constructor(private http: HttpClient) {}

  getTratamientosPorMascota(mascotaId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/${mascotaId}`);
  }

  crearTratamiento(tratamientoData: any): Observable<any> {
    return this.http.post<any>(this.API_URL, tratamientoData, {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  administrarMedicamento(data: {
    idMascota: number; idMedicamento: number; idVeterinario: number; cantidadUsada: number;
  }) {
    const params = new HttpParams()
      .set('idMascota', String(data.idMascota))
      .set('idMedicamento', String(data.idMedicamento))
      .set('idVeterinario', String(data.idVeterinario))
      .set('cantidadUsada', String(data.cantidadUsada));

    return this.http.post<any>(`${this.API_URL}/administrar`, null, { params });
  }
}