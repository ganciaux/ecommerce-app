import { Component, EventEmitter, Input, Output } from '@angular/core';

export type ErrorType = 'network' | 'not-found' | 'generic' | 'custom';

@Component({
  selector: 'app-error-display',
  imports: [],
  templateUrl: './error-display.html',
  styleUrl: './error-display.css',
})
export class ErrorDisplay {
  @Input() message: string = 'Une erreur est survenue';
  @Input() title?: string;
  @Input() type: ErrorType = 'generic';
  @Input() showRetry: boolean = true;

  @Output() onRetry = new EventEmitter<void>();

  getIcon(): string {
    switch (this.type) {
      case 'network':
        return '📡';
      case 'not-found':
        return '🔍';
      case 'generic':
        return '⚠️';
      default:
        return '❌';
    }
  }
}
