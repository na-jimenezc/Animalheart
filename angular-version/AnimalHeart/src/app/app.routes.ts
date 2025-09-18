import { Routes } from '@angular/router';


/*Acá ya quedaron definidas las rutas que se van a usar en la aplicación y los componentes que se van a cargar en cada una de ellas.*/
import { App } from './app';

import { Contacto } from './paginas/contacto/contacto';
import { LoginVeterinario } from './paginas/login-veterinario/login-veterinario';
import { LoginAdmin } from './paginas/login-admin/login-admin';
import { LoginCliente } from './paginas/login-cliente/login-cliente';

export const routes: Routes = [
  {
    path: '',
    component: App,
    children: [
      { path: '', redirectTo: 'inicio', pathMatch: 'full' },
      { path: 'inicio', component: App }, 
      { path: 'contacto', component: Contacto },
      { path: 'login-veterinario', component: LoginVeterinario },
      { path: 'login-admin', component: LoginAdmin },
      { path: 'clientes/login-cliente', component: LoginCliente},
      { path: '**', redirectTo: 'inicio' } 
    ]
  }
];