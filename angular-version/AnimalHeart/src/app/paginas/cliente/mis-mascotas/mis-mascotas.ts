import { ChangeDetectorRef, Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { take, catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';
import { ClienteService } from '../../../core/services/cliente.service';
import { HeaderCliente } from '../../../componentes/header-cliente/header-cliente';
import type { Cliente } from '../../../core/models/cliente.model';
import type { Mascota } from '../../../core/models/mascota.model';

@Component({
  selector: 'app-mis-mascotas',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderCliente],
  templateUrl: './mis-mascotas.html',
  styleUrls: ['./mis-mascotas.css']
})
export class MisMascotas implements OnInit {

  loading = true;
  error   = '';
  cliente: Cliente | null = null;
  mascotas: Mascota[] = [];

  constructor(
    private clienteSrv: ClienteService, 
    private router: Router, 
    private changeDetectorRef: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: any
  ) {}

  ngOnInit(): void {
    // Verificar si estamos en el navegador antes de usar sessionStorage
    if (isPlatformBrowser(this.platformId)) {
      const raw = sessionStorage.getItem('cliente');
      this.cliente = raw ? (JSON.parse(raw) as Cliente) : null;
    }

    if (!this.cliente?.id) {
      this.router.navigate(['/clientes/login-cliente']);
      return;
    }
    
    this.error = '';

    this.clienteSrv.getMascotasByCliente(this.cliente.id).pipe(
      take(1),
      catchError(err => {
        console.error('Error cargando mascotas del cliente:', err);
        this.error = 'No pudimos cargar tus mascotas. Intenta nuevamente.';
        return of([] as Mascota[]);
      }),
      finalize(() => {
        this.loading = false;
        this.changeDetectorRef.detectChanges();
      })
    )
    .subscribe(list => {
      this.mascotas = Array.isArray(list) ? list : [];
      this.loading = false;
      this.changeDetectorRef.detectChanges();
    });
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.removeItem('cliente');
    }
    this.router.navigate(['/clientes/login-cliente']);
  }
}