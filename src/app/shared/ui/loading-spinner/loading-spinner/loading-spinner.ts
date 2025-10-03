import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  template: `
    <div class="loading-container" [class.center]="center">
      <div class="spinner" [class.small]="size === 'small'" 
                          [class.medium]="size === 'medium'" 
                          [class.large]="size === 'large'">
      </div>
      @if (message) {
        <p class="loading-message">{{ message }}</p>
      }
    </div>
  `,
  styleUrls: ['./loading-spinner.css']
})
export class LoadingSpinnerComponent {
  @Input() message: string = '';
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() center: boolean = true;
}