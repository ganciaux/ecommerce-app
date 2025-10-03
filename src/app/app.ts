import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductList } from "./features/products/components/product-list/product-list";
import { GlobalLoadingComponent } from './core/components/global-loading/global-loading/global-loading';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ProductList, GlobalLoadingComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('ecommerce-app');
}
