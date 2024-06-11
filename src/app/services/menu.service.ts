import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private open: boolean = false;

  constructor() { }

  isOpen(): boolean {
    return this.open;
  }

  openMenu() {
    this.open = true;
  }

  closeMenu() {
    this.open = false;
  }

  getMenuItems(): object {
    return {
      '/': 'Appliance in use',
      '/train': 'Train model',
      '/predict': 'Predict with model',
      '/advanced': 'Advanced training and predicting',
    }
  }
}
