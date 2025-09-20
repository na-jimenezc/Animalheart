import { Routes } from '@angular/router';
import { HomeComponent } from './landing/home/home.component'; // Importamos el nuevo componente
import { Contacto } from './paginas/contacto/contacto';
import { LoginVeterinario } from './paginas/login-veterinario/login-veterinario';
import { LoginAdmin } from './paginas/login-admin/login-admin';
import { LoginCliente } from './paginas/login-cliente/login-cliente';

export const routes: Routes = [
  { path: '', component: HomeComponent }, 
  { path: 'contacto', component: Contacto },
  { path: 'login-veterinario', component: LoginVeterinario },
  { path: 'login-admin', component: LoginAdmin },
  { path: 'clientes/login-cliente', component: LoginCliente },
  { path: '**', redirectTo: '' }
];