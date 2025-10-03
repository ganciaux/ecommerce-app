import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../services/product-service';
import { AsyncPipe, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-product-list',
  imports: [AsyncPipe, JsonPipe],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css'
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
