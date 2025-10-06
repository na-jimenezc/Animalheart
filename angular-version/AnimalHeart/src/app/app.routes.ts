
import { Routes } from '@angular/router';
import { HomeComponent } from './landing/home/home.component';
import { Contacto } from './paginas/contacto/contacto';
import { LoginVeterinario } from './paginas/login-veterinario/login-veterinario';
import { LoginAdmin } from './paginas/login-admin/login-admin';
import { LoginCliente } from './paginas/login-cliente/login-cliente';
//import { ClientesList } from './paginas/clientes/clientes-list/clientes-list';
//import { ClienteDetalle } from './paginas/clientes/cliente-detalle/cliente-detalle';
//import { ClienteForm } from './paginas/clientes/cliente-form/cliente-form';
import { Mascotas } from './paginas/veterinario/mascotas/mascotas';
import { MascotaDetalle } from './paginas/veterinario/mascotas/mascota-detalle/mascota-detalle';
import { AgregarMascota } from './paginas/veterinario/mascotas/agregar-mascota/agregar-mascota';
import { EditarMascota } from './paginas/veterinario/mascotas/editar-mascota/editar-mascota';
import { Administrador } from './paginas/administrador/administrador';
import { adminGuard } from './core/guards/admin.guard'; // ⬅️ NUEVO

export const routes: Routes = [
  { path: '', component: HomeComponent }, 
  { path: 'contacto', component: Contacto },

  //Login
  { path: 'login-veterinario', component: LoginVeterinario },
  { path: 'admin/login', component: LoginAdmin },
  { path: 'clientes/login-cliente', component: LoginCliente },

  /* CRUD de clientes ESTA VAINA ESTÁ PENDIENTE
  { path: 'clientes', component: ClientesList },
  { path: 'clientes/agregar', component: ClienteForm },
  { path: 'clientes/editar/:id', component: ClienteForm },
  { path: 'clientes/detalle/:id', component: ClienteDetalle }*/

  //CRUD de mascotas
  { path: 'mascotas/ver-mascotas', component: Mascotas },
  { path: 'mascotas/agregar', component: AgregarMascota },
  { path: 'mascotas/editar/:id', component: EditarMascota },
  { path: 'mascotas/detalle/:id', component: MascotaDetalle },

  //Admin
  { path: 'admin/dashboard', component: Administrador, canActivate: [adminGuard] },
  { path: 'admin', redirectTo: 'admin/login', pathMatch: 'full' },

    //Redirecciones
  { path: '**', redirectTo: '' },
];
