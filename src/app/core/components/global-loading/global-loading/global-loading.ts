import { Component, inject } from '@angular/core';
import { LoadingService } from '../../../services/loading-service';
import { LoadingSpinnerComponent } from '../../../../shared/ui/loading-spinner/loading-spinner/loading-spinner';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-global-loading',
  standalone: true,
  imports: [LoadingSpinnerComponent, AsyncPipe],
  template: `
    @if (loadingService.isLoading$ | async) {
      <div class="global-loading-overlay">
        <app-loading-spinner 
          message="Chargement..."
          [size]="'large'"
          [center]="true">
        </app-loading-spinner>
      </div>
    }
  `,
  styles: [`
    .global-loading-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(255, 255, 255, 0.9);
      z-index: 9999;
      display: flex;
      align-items: center;
      justify-content: center;
      backdrop-filter: blur(2px);
    }
  `]
})
export class GlobalLoadingComponent {
  loadingService = inject(LoadingService);
}