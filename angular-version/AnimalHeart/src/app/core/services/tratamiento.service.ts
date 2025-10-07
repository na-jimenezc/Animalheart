import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tratamiento } from '../models/tratamiento.model';
import { TratamientoDTO } from '../models/DTO/tratamiento-dto';

@Injectable({ providedIn: 'root' })
export class TratamientoService {
  
  private readonly API_URL = 'http://localhost:8080/api/tratamientos';

  constructor(private http: HttpClient) {}

    //Tratamientos por mascota
    getTratamientosPorMascota(mascotaId: number): Observable<TratamientoDTO[]> {
        return this.http.get<TratamientoDTO[]>(`${this.API_URL}/${mascotaId}`);
    }

    // Agregar este método al servicio existente
crearTratamiento(tratamientoData: any): Observable<any> {
  return this.http.post<any>(this.API_URL, tratamientoData, {
    headers: { 'Content-Type': 'application/json' }
  });
}

  administrarMedicamento(tratamientoData: {
    idMascota: number,
    idMedicamento: number, 
    idVeterinario: number,
    cantidadUsada: number
  }): Observable<any> {
    const params = new HttpParams()
      .set('idMascota', tratamientoData.idMascota.toString())
      .set('idMedicamento', tratamientoData.idMedicamento.toString())
      .set('idVeterinario', tratamientoData.idVeterinario.toString())
      .set('cantidadUsada', tratamientoData.cantidadUsada.toString());

    return this.http.post<any>(`${this.API_URL}/administrar`, null, { params });
  }
}