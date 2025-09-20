import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Header } from './landing/header/header';
import { Footer } from './landing/footer/footer';

@Component({
  selector: 'app-root',
  imports: [RouterModule, Header, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = 'AnimalHeart';
}