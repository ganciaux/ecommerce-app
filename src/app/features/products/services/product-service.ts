import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environments';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { BehaviorSubject, map, Subject, takeUntil } from 'rxjs';
import { Product, ProductFilters, ProductState } from '../models/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private destroy$ = new Subject<void>();
  private state = new BehaviorSubject<ProductState>({ data: null, loading: false, error: null });
  private httpClient=inject(HttpClient);
  private apiUrl = environment.apiUrl

  state$ = this.state.asObservable();
  products$ = this.state$.pipe(map(state => state.data));
  loading$ = this.state$.pipe(map(state => state.loading));
  error$ = this.state$.pipe(map(state => state.error));

  private setLoading(loading: boolean): void {
    this.state.next({ ...this.state.value, loading, error: null });
  }

  private setState(newState: Partial<ProductState>): void {
    this.state.next({ ...this.state.value, ...newState });
  }

  private getProductErrorMessage(error: HttpErrorResponse): string {
    if (error.status === 0) {
      return '⚠️ Serveur indisponible. Vérifiez que JSON Server est démarré.';
    }
    if (error.status === 404) {
      return '🔍 Produit non trouvé.';
    }
    return '❌ Erreur lors du chargement des produits.';
  }

  loadProducts(filters?: ProductFilters):void{
    let params = new HttpParams();

    this.setLoading(true);
      
    if (filters?.category) {
      params = params.set('category', filters.category);
    }

    if (filters?.minPrice !== undefined) {
      params = params.set('price_gte', filters.minPrice.toString());
    }
    
    if (filters?.maxPrice !== undefined) {
      params = params.set('price_lte', filters.maxPrice.toString());
    }
    
    if (filters?.search) {
      params = params.set('q', filters.search);
    }

    if (filters?.page) params = params.set('_page', filters.page);
    
    if (filters?.limit) params = params.set('_limit', filters.limit);

    this.httpClient.get<Product[]>(`${this.apiUrl}/products`, { params })
     .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (products) => {
        this.setState({ 
          data: products, 
          loading: false, 
          error: null 
        });
      },
      error: (error: HttpErrorResponse) => {
        const errorMessage = this.getProductErrorMessage(error);
        this.setState({ 
          data: null, 
          loading: false, 
          error: errorMessage 
        });
      }
    });
  };

}
