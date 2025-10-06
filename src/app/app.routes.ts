import { Routes } from '@angular/router';
import { HomeComponent } from './core/layout/home/home.component/home.component';
import { ProductListPage } from './features/products/pages/product-list-page/product-list-page/product-list-page';
import { ProductDetailsPage } from './features/products/components/product-details-page/product-details-page/product-details-page';
import { productResolverResolver } from './features/products/resolvers/product.resolver-resolver';
import { LoginPageComponent } from './features/auth/pages/login-page/login-page.component/login-page.component';

export const routes: Routes = [
  {
    path: 'products',
    component: ProductListPage,
  },
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: 'products/:id',
    loadComponent: () =>
      import(
        './features/products/components/product-details-page/product-details-page/product-details-page'
      ).then((c) => c.ProductDetailsPage),
    resolve: {
      product: productResolverResolver,
    },
  },
  {
    path: '**',
    component: HomeComponent,
  },
];
