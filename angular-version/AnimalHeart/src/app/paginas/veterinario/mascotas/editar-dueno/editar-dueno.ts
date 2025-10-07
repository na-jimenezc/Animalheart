import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from '../../../../core/services/cliente.service';
import { Cliente } from '../../../../core/models/cliente.model';

@Component({
  selector: 'app-editar-dueno',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './editar-dueno.html',
  styleUrls: ['./editar-dueno.css']
})
export class EditarDueno implements OnInit {
  loading = true;
  error = '';
  clienteId!: number;
  data: Partial<Cliente> = {
    nombre: '',
    cedula: '',
    correo: '',
    celular: ''
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private clienteSrv: ClienteService,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) { this.error = 'ID de cliente inválido'; this.loading = false; return; }
    this.clienteId = +id;

    this.clienteSrv.getClienteById(this.clienteId).subscribe({
      next: (cli) => {
        this.data = {
          nombre: cli.nombre,
          cedula: cli.cedula,
          correo: cli.correo,
          celular: cli.celular
        };
        this.loading = false;
      },
      error: (err) => {
        console.error('Error cargando cliente', err);
        this.error = 'No se pudo cargar el cliente';
        this.loading = false;
      }
    });
  }

  onSubmit(form: NgForm): void {
    if (form.invalid) {
      form.control.markAllAsTouched();
      return;
    }
    this.loading = true;
    this.clienteSrv.updateCliente(this.clienteId, this.data as Cliente).subscribe({
      next: () => {
        alert('Cliente actualizado correctamente.');
        history.back();
      },
      error: (err) => {
        console.error('Error actualizando cliente', err);
        this.error = 'No se pudo actualizar el cliente';
        this.loading = false;
      }
    });
  }

  cancelar(): void {
    history.back();
  }
}