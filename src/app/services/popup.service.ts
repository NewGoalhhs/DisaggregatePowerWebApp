import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PopupService {
  private hide: boolean = true;

  constructor() { }

  getHide() {
    return this.hide;
  }

  setHide(hide: boolean) {
    this.hide = hide;
  }

  toggleHide() {
    this.hide = !this.hide;
  }
}
