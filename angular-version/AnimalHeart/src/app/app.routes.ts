import { Routes } from '@angular/router';
import { HomeComponent } from './landing/home/home.component'; // Importamos el nuevo componente
import { Contacto } from './paginas/contacto/contacto';
import { LoginVeterinario } from './paginas/login-veterinario/login-veterinario';
import { LoginAdmin } from './paginas/login-admin/login-admin';
import { LoginCliente } from './paginas/login-cliente/login-cliente';
import { Mascotas } from './paginas/veterinario/mascotas/mascotas';
import { MascotaDetalle } from './paginas/veterinario/mascotas/mascota-detalle/mascota-detalle';
import { AgregarMascota } from './paginas/veterinario/mascotas/agregar-mascota/agregar-mascota';
import { EditarMascota } from './paginas/veterinario/mascotas/editar-mascota/editar-mascota';



export const routes: Routes = [
  { path: '', component: HomeComponent }, 
  { path: 'contacto', component: Contacto },
  { path: 'login-veterinario', component: LoginVeterinario },
  { path: 'login-admin', component: LoginAdmin },
  { path: 'clientes/login-cliente', component: LoginCliente },
  { path: 'mascotas/agregar', component: AgregarMascota },
  { path: 'mascotas/ver-mascotas', component: Mascotas },
  { path: '', redirectTo: 'mascotas/ver-mascotas', pathMatch: 'full' },
  { path: 'mascotas/detalle/:id', component: MascotaDetalle },
  { path: 'mascotas/editar/:id', component: EditarMascota },
  { path: '**', redirectTo: '' },
];