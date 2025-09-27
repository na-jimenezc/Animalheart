import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
}