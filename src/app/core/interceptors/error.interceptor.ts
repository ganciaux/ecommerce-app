import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
     switch (error.status) {
        case 0:
          console.error('🚫 Serveur inaccessible - Vérifiez la connexion');
          break;
        case 401:
          console.warn('🔐 Session expirée');
          router.navigate(['/login']);
          break;
        case 403:
          console.error('⛔ Accès refusé');
          break;
        case 404:
          console.warn('🔍 Ressource non trouvée:', req.url);
          break;
        case 500:
          console.error('💥 Erreur serveur interne');
          break;
        default:
          console.error(`❌ Erreur HTTP ${error.status}:`, error.message);
      }
      return throwError(() => error);
    })
  );
};