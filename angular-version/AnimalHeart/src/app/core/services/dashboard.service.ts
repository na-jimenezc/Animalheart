import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, of, map, switchMap, catchError, timeout } from 'rxjs';
import { TratamientoService } from './tratamiento.service';
import { MedicamentosService } from './medicamentos.service';
import { VeterinarioService } from './veterinario.service';
import { MascotasService } from './mascotas.service';

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

  constructor(
    private http: HttpClient,
    private tratamientoService: TratamientoService,
    private medicamentoService: MedicamentosService,
    private veterinarioService: VeterinarioService,
    private mascotasService: MascotasService
  ) {}

  getDashboardData(): Observable<DashboardData> {
    return forkJoin({
      medicamentos: this.medicamentoService.getAll().pipe(
        timeout(10000),
        catchError(err => {
          console.error('Error obteniendo medicamentos:', err);
          return of([]);
        })
      ),
      veterinarios: this.veterinarioService.getAll().pipe(
        timeout(10000),
        catchError(err => {
          console.error('Error obteniendo veterinarios:', err);
          return of([]);
        })
      ),
      mascotas: this.mascotasService.getAll().pipe(
        timeout(10000),
        catchError(err => {
          console.error('Error obteniendo mascotas:', err);
          return of([]);
        })
      )
    }).pipe(
      switchMap(({ medicamentos, veterinarios, mascotas }) => {
        const mascotasArr = Array.isArray(mascotas) ? mascotas : [];
        
        // Si no hay mascotas, retornar dashboard vacío
        if (mascotasArr.length === 0) {
          return of(this._mapDashboard([], medicamentos, veterinarios, mascotasArr));
        }

        // Limitar el número de mascotas a procesar para evitar sobrecarga
        const maxMascotas = 100;
        const mascotasLimitadas = mascotasArr.slice(0, maxMascotas);

        const porMascota$ = mascotasLimitadas.map((m: any) =>
          this.tratamientoService
            .getTratamientosPorMascota(m.id)
            .pipe(
              timeout(5000), // Timeout de 5 segundos por mascota
              catchError(err => {
                console.warn(`Error obteniendo tratamientos para mascota ${m.id}:`, err);
                return of([]);
              })
            )
        );

        // Si no hay mascotas para procesar, retornar dashboard vacío
        if (porMascota$.length === 0) {
          return of(this._mapDashboard([], medicamentos, veterinarios, mascotasArr));
        }

        return forkJoin(porMascota$).pipe(
          timeout(20000), // Timeout general de 20 segundos
          map((listas: any[][]) => listas.flat()),
          map((tratamientos: any[]) =>
            this._mapDashboard(tratamientos, medicamentos, veterinarios, mascotasArr)
          ),
          catchError(err => {
            console.error('Error procesando tratamientos:', err);
            return of(this._mapDashboard([], medicamentos, veterinarios, mascotasArr));
          })
        );
      }),
      catchError(err => {
        console.error('Error general en getDashboardData:', err);
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

  private _mapDashboard(
    tratamientos: any[],
    medicamentos: any[],
    veterinarios: any[],
    mascotas: any[]
  ): DashboardData {
    const medById = new Map<any, any>();
    for (const m of (medicamentos || [])) {
      if (m && m.id != null) {
        medById.set(m.id, m);
      }
    }

    const acc = new Map<string, { medicamento: string; cantidad: number; venta: number; costo: number }>();
    let ventasTotales = 0;
    let costoTotales = 0;

    for (const t of (tratamientos || [])) {
      if (!t) continue;

      const mid = t?.medicamento?.id ?? t?.medicamentoId;
      const mref = mid != null ? medById.get(mid) : (t?.medicamento ?? null);
      const nombre = (mref?.nombre ?? t?.medicamento?.nombre ?? 'Sin nombre').toString();

      const qty = Number(t?.cantidadUsada ?? t?.cantidad ?? 1) || 0;
      const pVenta = Number(t?.precioUnitario ?? mref?.precioVenta ?? 0) || 0;
      const pCompra = Number(mref?.precioCompra ?? 0) || 0;

      const venta = pVenta * qty;
      const costo = pCompra * qty;

      ventasTotales += venta;
      costoTotales += costo;

      const cur = acc.get(nombre) ?? { medicamento: nombre, cantidad: 0, venta: 0, costo: 0 };
      cur.cantidad += qty;
      cur.venta += venta;
      cur.costo += costo;
      acc.set(nombre, cur);
    }

    const tratamientosPorMedicamento = Array.from(acc.values())
      .map(x => ({ medicamento: x.medicamento, cantidad: x.cantidad }));

    const top3Tratamientos = Array.from(acc.values())
      .sort((a, b) => b.cantidad - a.cantidad)
      .slice(0, 3)
      .map(x => ({ medicamento: x.medicamento, unidadesVendidas: x.cantidad }));

    const isVetActivo = (v: any) => {
      if (!v) return false;
      return typeof v?.activo === 'boolean' ? v.activo : v?.activo === 1;
    };
    
    const veterinariosActivos = (veterinarios || []).filter(isVetActivo).length;
    const veterinariosInactivos = Math.max((veterinarios?.length || 0) - veterinariosActivos, 0);

    const totalMascotas = mascotas?.length || 0;
    const isMascActiva = (m: any) => {
      if (!m) return false;
      return typeof m?.activo === 'boolean' ? m.activo
        : typeof m?.activa === 'boolean' ? m.activa
        : (m?.activo === 1 || m?.activa === 1);
    };
    const mascotasActivas = (mascotas || []).filter(isMascActiva).length;

    return {
      totalTratamientosUltimoMes: (tratamientos?.length || 0),
      tratamientosPorMedicamento,
      veterinariosActivos,
      veterinariosInactivos,
      totalMascotas,
      mascotasActivas,
      ventasTotales,
      gananciasTotales: Math.max(ventasTotales - costoTotales, 0),
      top3Tratamientos,
      todosVeterinarios: veterinarios || []
    };
  }
}