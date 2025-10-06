import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../services/product-service';
import { AsyncPipe } from '@angular/common';
import { ProductCard } from '../product-card/product-card/product-card';
import { LoadingSpinnerComponent } from '../../../../shared/ui/loading-spinner/loading-spinner/loading-spinner';
import { ErrorDisplay } from '../../../../shared/ui/error-display/error-display/error-display';

@Component({
  selector: 'app-product-list',
  imports: [AsyncPipe, ProductCard, LoadingSpinnerComponent, ErrorDisplay],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList implements OnInit {
  productService = inject(ProductService);
  products$ = this.productService.products$;
  loading$ = this.productService.loading$;
  error$ = this.productService.error$;
  state$ = this.productService.state$;

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.loadProducts();
  }
}
