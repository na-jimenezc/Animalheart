import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, of, map, switchMap, catchError } from 'rxjs';
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
      medicamentos: this.medicamentoService.getAll().pipe(catchError(() => of([]))),
      veterinarios: this.veterinarioService.getAll().pipe(catchError(() => of([]))),
      mascotas:     this.mascotasService.getAll().pipe(catchError(() => of([])))
    }).pipe(
      switchMap(({ medicamentos, veterinarios, mascotas }) => {
        const mascotasArr = Array.isArray(mascotas) ? mascotas : [];
        if (mascotasArr.length === 0) {
          return of(this._mapDashboard([], medicamentos, veterinarios, mascotasArr));
        }

        const porMascota$ = mascotasArr.map((m: any) =>
          this.tratamientoService
            .getTratamientosPorMascota(m.id)
            .pipe(catchError(() => of([])))
        );

        return forkJoin(porMascota$).pipe(
          map((listas: any[][]) => listas.flat()),
          map((tratamientos: any[]) =>
            this._mapDashboard(tratamientos, medicamentos, veterinarios, mascotasArr)
          ),
          catchError(() => of(this._mapDashboard([], medicamentos, veterinarios, mascotasArr)))
        );
      })
    );
  }

  private _mapDashboard(
    tratamientos: any[],
    medicamentos: any[],
    veterinarios: any[],
    mascotas: any[]
  ): DashboardData {
    const medById = new Map<any, any>();
    for (const m of (medicamentos || [])) medById.set(m.id, m);

    const acc = new Map<string, { medicamento: string; cantidad: number; venta: number; costo: number }>();
    let ventasTotales = 0;
    let costoTotales  = 0;

    for (const t of (tratamientos || [])) {
      const mid   = t?.medicamento?.id ?? t?.medicamentoId;
      const mref  = mid != null ? medById.get(mid) : (t?.medicamento ?? null);
      const nombre = (mref?.nombre ?? t?.medicamento?.nombre ?? 'Sin nombre').toString();

      const qty     = Number(t?.cantidadUsada ?? t?.cantidad ?? 1) || 0;
      const pVenta  = Number(t?.precioUnitario ?? mref?.precioVenta ?? 0) || 0;
      const pCompra = Number(mref?.precioCompra ?? 0) || 0;

      const venta = pVenta * qty;
      const costo = pCompra * qty;

      ventasTotales += venta;
      costoTotales  += costo;

      const cur = acc.get(nombre) ?? { medicamento: nombre, cantidad: 0, venta: 0, costo: 0 };
      cur.cantidad += qty;
      cur.venta    += venta;
      cur.costo    += costo;
      acc.set(nombre, cur);
    }

    const tratamientosPorMedicamento = Array.from(acc.values())
      .map(x => ({ medicamento: x.medicamento, cantidad: x.cantidad }));

    const top3Tratamientos = Array.from(acc.values())
      .sort((a, b) => b.cantidad - a.cantidad)
      .slice(0, 3)
      .map(x => ({ medicamento: x.medicamento, unidadesVendidas: x.cantidad }));

    const isVetActivo = (v: any) => (typeof v?.activo === 'boolean' ? v.activo : v?.activo === 1);
    const veterinariosActivos   = (veterinarios || []).filter(isVetActivo).length;
    const veterinariosInactivos = Math.max((veterinarios?.length || 0) - veterinariosActivos, 0);

    const totalMascotas = mascotas?.length || 0;
    const isMascActiva = (m: any) =>
      typeof m?.activo === 'boolean' ? m.activo
      : typeof m?.activa === 'boolean' ? m.activa
      : (m?.activo === 1 || m?.activa === 1);
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

  private processDashboardData(data: any): DashboardData {
    const ahora = new Date();
    const ultimoMes = new Date(ahora.getFullYear(), ahora.getMonth() - 1, ahora.getDate());

    const tratamientosUltimoMes = data.tratamientos.filter((t: any) => {
      const fechaTratamiento = new Date(t.fecha);
      return fechaTratamiento >= ultimoMes;
    });

    const tratamientosPorMedicamento = this.calculateTratamientosPorMedicamento(
      tratamientosUltimoMes,
      data.medicamentos
    );

    const veterinariosActivos = data.veterinarios.filter((v: any) => v.activo === 1).length;
    const veterinariosInactivos = data.veterinarios.filter((v: any) => v.activo === 0).length;

    const totalMascotas = data.mascotas.length;
    const mascotasActivas = data.mascotas.filter((m: any) => m.activo).length;

    const { ventasTotales, gananciasTotales } = this.calculateVentasYGanancias(data.tratamientos, data.medicamentos);
    const top3Tratamientos = this.calculateTop3Tratamientos(data.tratamientos, data.medicamentos);

    return {
      totalTratamientosUltimoMes: tratamientosUltimoMes.length,
      tratamientosPorMedicamento,
      veterinariosActivos,
      veterinariosInactivos,
      totalMascotas,
      mascotasActivas,
      ventasTotales,
      gananciasTotales,
      top3Tratamientos,
      todosVeterinarios: data.veterinarios
    };
  }

  private calculateTratamientosPorMedicamento(tratamientos: any[], medicamentos: any[]): any[] {
    const medicamentoMap = new Map();

    tratamientos.forEach(tratamiento => {
      const medicamentoId = tratamiento.medicamento?.id || tratamiento.medicamentoId;
      const medicamento = medicamentos.find((m: any) => m.id === medicamentoId);
      if (medicamento) {
        const current = medicamentoMap.get(medicamento.nombre) || 0;
        const qty = Number(tratamiento.cantidadUsada ?? tratamiento.cantidad ?? 1) || 0;
        medicamentoMap.set(medicamento.nombre, current + qty);
      }
    });

    return Array.from(medicamentoMap.entries()).map(([medicamento, cantidad]) => ({
      medicamento,
      cantidad
    }));
  }

  private calculateVentasYGanancias(tratamientos: any[], medicamentos: any[]): { ventasTotales: number, gananciasTotales: number } {
    let ventasTotales = 0;
    let gananciasTotales = 0;

    tratamientos.forEach(tratamiento => {
      const medicamentoId = tratamiento.medicamento?.id || tratamiento.medicamentoId;
      const medicamento = medicamentos.find((m: any) => m.id === medicamentoId);
      if (medicamento) {
        const qty = Number(tratamiento.cantidadUsada ?? tratamiento.cantidad ?? 1) || 0;
        const venta = Number(medicamento.precioVenta ?? 0) * qty;
        const costo = Number(medicamento.precioCompra ?? 0) * qty;
        ventasTotales += venta;
        gananciasTotales += (venta - costo);
      }
    });

    return { ventasTotales, gananciasTotales };
  }

  private calculateTop3Tratamientos(tratamientos: any[], medicamentos: any[]): any[] {
    const medicamentoVentas = new Map();

    tratamientos.forEach(tratamiento => {
      const medicamentoId = tratamiento.medicamento?.id || tratamiento.medicamentoId;
      const medicamento = medicamentos.find((m: any) => m.id === medicamentoId);
      if (medicamento) {
        const current = medicamentoVentas.get(medicamento.nombre) || 0;
        const qty = Number(tratamiento.cantidadUsada ?? tratamiento.cantidad ?? 1) || 0;
        medicamentoVentas.set(medicamento.nombre, current + qty);
      }
    });

    return Array.from(medicamentoVentas.entries())
      .map(([medicamento, unidadesVendidas]) => ({ medicamento, unidadesVendidas }))
      .sort((a, b) => b.unidadesVendidas - a.unidadesVendidas)
      .slice(0, 3);
  }
}