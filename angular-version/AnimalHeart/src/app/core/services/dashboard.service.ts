
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, timeout } from 'rxjs';

export interface DashboardData {
  totalTratamientosUltimoMes: number;
  tratamientosPorMedicamento: { medicamento: string, cantidad: number }[];
  veterinariosActivos: number;
  veterinariosInactivos: number;
  totalMascotas: number;
  mascotasActivas: number;
  ventasTotales: number;
  gananciasTotales: number;
  top3Tratamientos: { medicamento: string, unidadesVendidas: number }[];
  todosVeterinarios: any[];
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = 'http://localhost:8080/api/dashboard';

  constructor(private http: HttpClient) {}

  getDashboardData(): Observable<DashboardData> {
    return this.http.get<DashboardData>(this.apiUrl)
      .pipe(
        timeout(15000),
        catchError(err => {
          console.error('Error obteniendo datos del dashboard:', err);
          return of(this._getEmptyDashboard());
        })
      );
  }

  private _getEmptyDashboard(): DashboardData {
    return {
      totalTratamientosUltimoMes: 0,
      tratamientosPorMedicamento: [],
      veterinariosActivos: 0,
      veterinariosInactivos: 0,
      totalMascotas: 0,
      mascotasActivas: 0,
      ventasTotales: 0,
      gananciasTotales: 0,
      top3Tratamientos: [],
      todosVeterinarios: []
    };
  }
}