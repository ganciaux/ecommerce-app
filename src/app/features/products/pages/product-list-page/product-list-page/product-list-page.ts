import { Component } from '@angular/core';
import { ProductList } from '../../../components/product-list/product-list';
import { ProductFilter } from '../../../components/product-filter/product-filter/product-filter';

@Component({
  selector: 'app-product-list-page',
  imports: [ProductList, ProductFilter],
  templateUrl: './product-list-page.html',
  styleUrl: './product-list-page.css',
})
export class ProductListPage {}
