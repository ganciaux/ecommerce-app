import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GlobalLoadingComponent } from './core/components/global-loading/global-loading/global-loading';
import { Header } from './core/layout/header/header/header';
import { Footer } from './core/layout/footer/footer/footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, GlobalLoadingComponent, Header, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('ecommerce-app');
}
