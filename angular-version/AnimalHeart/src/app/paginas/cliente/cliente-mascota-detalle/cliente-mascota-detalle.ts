import { Component, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import {
  of,
  combineLatest,
  Observable,
} from 'rxjs';
import {
  map,
  switchMap,
  shareReplay,
  catchError,
  startWith,
  filter,
  distinctUntilChanged,
} from 'rxjs/operators';

import { HeaderCliente } from '../../../componentes/header-cliente/header-cliente';
import { MascotasService } from '../../../core/services/mascotas.service';
import { TratamientoService } from '../../../core/services/tratamiento.service';
import { ClienteService } from '../../../core/services/cliente.service';
import type { Mascota } from '../../../core/models/mascota.model';
import type { Cliente } from '../../../core/models/cliente.model';
import type { TratamientoDTO } from '../../../core/models/DTO/tratamiento-dto';

interface ViewModel {
  mascota: Mascota | null;
  cliente: Cliente | null;
  tratamientos: TratamientoDTO[];
  loadingTratamientos: boolean;
}

@Component({
  selector: 'app-cliente-mascota-detalle',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderCliente],
  templateUrl: './cliente-mascota-detalle.html',
  styleUrls: ['./cliente-mascota-detalle.css']
})
export class ClienteMascotaDetalle implements OnInit {
  defaultImage = 'https://api.dicebear.com/7.x/bottts/svg?seed=Mascota';
  
  vm$!: Observable<ViewModel>;

  constructor(
    private route: ActivatedRoute,
    private mascotasSrv: MascotasService,
    private tratamientoSrv: TratamientoService,
    private clienteSrv: ClienteService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.initializeObservables();
  }

  private initializeObservables(): void {
    /** Lee el id de la ruta */
    const mascotaId$ = this.route.paramMap.pipe(
      map((pm) => {
        const raw = pm.get('id');
        const id = Number(raw);
        return Number.isFinite(id) ? id : NaN;
      }),
      filter((id) => !Number.isNaN(id)),
      distinctUntilChanged(),
      shareReplay(1)
    );

    /** Mascota por id desde el service */
    const mascota$ = mascotaId$.pipe(
      switchMap((id) => this.mascotasSrv.getById(id)),
      catchError(() => of(null)),
      shareReplay(1)
    );

    /** Cliente desde sessionStorage */
    const cliente$ = of(null).pipe(
      map(() => {
        if (isPlatformBrowser(this.platformId)) {
          const raw = sessionStorage.getItem('cliente');
          return raw ? JSON.parse(raw) : null;
        }
        return null;
      }),
      shareReplay(1)
    );

    /** Tratamientos de la mascota */
    const tratamientos$ = mascotaId$.pipe(
      switchMap((id) => this.tratamientoSrv.getTratamientosPorMascota(id)),
      catchError(() => of([])),
      shareReplay(1)
    );

    const loadingTratamientos$ = tratamientos$.pipe(
      map(() => false),
      startWith(true)
    );

    /** ViewModel para el template */
    this.vm$ = combineLatest({
      mascota: mascota$,
      cliente: cliente$,
      tratamientos: tratamientos$.pipe(startWith([])),
      loadingTratamientos: loadingTratamientos$,
    });
  }

  formatearFecha(fecha: string | Date): string {
    const d = new Date(fecha);
    return isNaN(d.getTime()) ? '' : d.toLocaleDateString('es-ES');
  }

  onImageError(evt: Event) {
    (evt.target as HTMLImageElement).src = this.defaultImage;
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.removeItem('cliente');
    }
   
}
}