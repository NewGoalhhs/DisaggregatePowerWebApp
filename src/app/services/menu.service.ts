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
}
