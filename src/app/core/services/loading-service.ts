import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loadingCount = 0;
  private isLoading = new BehaviorSubject<boolean>(false);
  
  isLoading$ = this.isLoading.asObservable();

  show() {
    this.loadingCount++;
    if (this.loadingCount === 1) {
      this.isLoading.next(true);
    }
  }

  hide() {
    this.loadingCount--;
    if (this.loadingCount === 0) {
      this.isLoading.next(false);
    }
    
    if (this.loadingCount < 0) {
      this.loadingCount = 0;
    }
  }

  reset() {
    this.loadingCount = 0;
    this.isLoading.next(false);
  }
}
