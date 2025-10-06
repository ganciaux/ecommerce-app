import { Component, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProductFilters } from '../../../models/product.interface';
import { ProductService } from '../../../services/product-service';

@Component({
  selector: 'app-product-filter',
  imports: [],
  templateUrl: './product-filter.html',
  styleUrl: './product-filter.css',
})
export class ProductFilter {
  currentMaxPrice = 500;
  currentCategory = 'all';
  filters = new BehaviorSubject<ProductFilters>({
    category: '',
    minPrice: 0,
    maxPrice: 0,
    search: '',
  });

  private productService = inject(ProductService);

  filters$ = this.filters.asObservable();

  changePrice(event: Event) {
    const current = this.filters.value;
    const target = event.target as HTMLInputElement;
    this.currentMaxPrice = parseInt(target.value);
    this.applyFilters();
  }

  changeCategory(event: Event) {
    const current = this.filters.value;
    const target = event.target as HTMLInputElement;
    this.currentCategory = target.value;
    this.applyFilters();
  }

  private applyFilters() {
    this.productService.loadProducts({
      category: this.currentCategory === 'all' ? '' : this.currentCategory,
      minPrice: 0,
      maxPrice: this.currentMaxPrice,
      search: '',
    });
  }
}
