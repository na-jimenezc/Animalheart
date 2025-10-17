import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Header } from './landing/header/header';
import { Footer } from './landing/footer/footer';
import { Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [RouterModule, Header, Footer, CommonModule,  HttpClientModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = 'AnimalHeart';

   ocultarHeader = false;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {      
        this.ocultarHeader = 
          event.urlAfterRedirects.startsWith('/mascotas') ||
          event.urlAfterRedirects.startsWith('/login/') || 
          event.urlAfterRedirects.startsWith('/admin/dashboard') || 
          event.urlAfterRedirects.startsWith('/tratamientos');
      }
    });
  }
}