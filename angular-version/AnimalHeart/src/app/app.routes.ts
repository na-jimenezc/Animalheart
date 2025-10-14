import { Routes } from '@angular/router';
import { HomeComponent } from './landing/home/home.component';
import { Contacto } from './paginas/contacto/contacto';
import { LoginVeterinario } from './paginas/login-veterinario/login-veterinario';
import { LoginAdmin } from './paginas/login-admin/login-admin';
import { LoginCliente } from './paginas/login-cliente/login-cliente';
import { Mascotas } from './paginas/veterinario/mascotas/mascotas';
import { MascotaDetalle } from './paginas/veterinario/mascotas/mascota-detalle/mascota-detalle';
import { AgregarMascota } from './paginas/veterinario/mascotas/agregar-mascota/agregar-mascota';
import { EditarMascota } from './paginas/veterinario/mascotas/editar-mascota/editar-mascota';
import { Administrador } from './paginas/administrador/administrador';
import { adminGuard } from './core/guards/admin.guard'; 
import { AgregarDueno } from './paginas/veterinario/mascotas/agregar-dueno/agregar-dueno';
import { AgregarTratamiento } from './paginas/veterinario/mascotas/agregar-tratamiento/agregar-tratamiento';
import { MisMascotas } from './paginas/cliente/mis-mascotas/mis-mascotas';
import { EditarDueno } from './paginas/veterinario/mascotas/editar-dueno/editar-dueno';
import { ImportarMedicamentos } from './paginas/administrador/importar-medicamentos/importar-medicamentos';
import { ClienteDetalle } from './paginas/cliente/cliente-detalle/cliente-detalle';
import { ClienteMascotaDetalle } from './paginas/cliente/cliente-mascota-detalle/cliente-mascota-detalle';

export const routes: Routes = [
  { path: '', component: HomeComponent }, 
  { path: 'contacto', component: Contacto },
  { path: 'login-veterinario', component: LoginVeterinario },
  { path: 'admin/login', component: LoginAdmin },
  { path: 'clientes/login-cliente', component: LoginCliente },
  { path: 'clientes/detalle/:id', component: ClienteDetalle },
  { path: 'mascotas/ver-mascotas', component: Mascotas },
  { path: 'mascotas/agregar', component: AgregarMascota },
  { path: 'mascotas/editar/:id', component: EditarMascota },
  { path: 'mascotas/detalle/:id', component: MascotaDetalle },
  { path: 'clientes/nuevo', component: AgregarDueno },
  { path: 'tratamientos/agregar', component: AgregarTratamiento },
  { path: 'admin/dashboard', component: Administrador, canActivate: [adminGuard] },
  { path: 'admin', redirectTo: 'admin/login', pathMatch: 'full' },
  { path: 'clientes/mis-mascotas', component: MisMascotas },
  { path: 'veterinario/mascotas/editar-dueno/:id', component: EditarDueno },
  { path: 'admin/medicamentos/importar', component: ImportarMedicamentos },
  { path: 'clientes/mascotas/:id', component: ClienteMascotaDetalle },
  { path: '**', redirectTo: '' },
];