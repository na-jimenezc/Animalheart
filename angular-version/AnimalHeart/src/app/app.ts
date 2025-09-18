import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgModule } from '@angular/core';


/*Componentes de la landing page*/
import { Header} from './landing/header/header';
import { TarjetaPrincipal } from './landing/tarjeta-principal/tarjeta-principal';
import { MisionVision } from './landing/mision-vision/mision-vision';
import { TarjetasServicios } from './landing/tarjetas-servicios/tarjetas-servicios';
import { CarruselOpiniones } from './landing/carrusel-opiniones/carrusel-opiniones';
import { Footer } from './landing/footer/footer';

/*Componentes de las páginas internas*/
import { Contacto } from './paginas/contacto/contacto';
import { LoginVeterinario } from './paginas/login-veterinario/login-veterinario';
import { LoginAdmin } from './paginas/login-admin/login-admin';
import { LoginCliente } from './paginas/login-cliente/login-cliente';



@Component({
  selector: 'app-root',
   imports: [
    RouterOutlet,
    Header,
    TarjetaPrincipal,
    MisionVision,
    TarjetasServicios,
    CarruselOpiniones,
    Footer,
    Contacto,
    LoginVeterinario,
    LoginAdmin,
    LoginCliente
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('AnimalHeart');
}
