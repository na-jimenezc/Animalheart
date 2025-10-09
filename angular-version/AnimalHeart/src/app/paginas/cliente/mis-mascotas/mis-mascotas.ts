import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { take, catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';
import { ClienteService } from '../../../core/services/cliente.service';
import type { Cliente } from '../../../core/models/cliente.model';
import type { Mascota } from '../../../core/models/mascota.model';

@Component({
  selector: 'app-mis-mascotas',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './mis-mascotas.html',
  styleUrls: ['./mis-mascotas.css']
})
export class MisMascotas implements OnInit {

  loading = true;
  error   = '';
  cliente: Cliente | null = null;
  mascotas: Mascota[] = [];

  constructor(private clienteSrv: ClienteService, private router: Router, private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    const raw = sessionStorage.getItem('cliente');
    this.cliente = raw ? (JSON.parse(raw) as Cliente) : null;

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
      })
    )
    .subscribe(list => {
      this.mascotas = Array.isArray(list) ? list : [];
      console.log('Mascotas del cliente cargadas:', this.loading);
      this.loading = false;
      console.log('Mascotas del cliente cargadas:', this.loading);
      this.changeDetectorRef.detectChanges();

    });
  }

  logout(): void {
    sessionStorage.removeItem('cliente');
    this.router.navigate(['/clientes/login-cliente']);
  }
}