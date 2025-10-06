import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { ProductService } from '../services/product-service';
import { catchError, of } from 'rxjs';
import { Product } from '../models/product.interface';

export const productResolverResolver: ResolveFn<Product | null> = (route, state) => {
  const productService = inject(ProductService);
  const router = inject(Router);
  const productId = parseInt(route.paramMap.get('id')!);

  return productService.getProduct(productId).pipe(
    catchError((error) => {
      router.navigate(['/products']);
      return of(null);
    })
  );
};
