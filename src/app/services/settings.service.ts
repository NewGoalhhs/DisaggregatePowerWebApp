import { Injectable } from '@angular/core';
import {LocalstorageService} from "./localstorage.service";

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(private localstorageService: LocalstorageService) { }

  private apiURL: string = "http://localhost:4201/api";

  setApiURL(url: string) {
    this.apiURL = url;
    this.localstorageService.set(this, 'apiURL', url);
  }

  getApiURL() {
    return this.apiURL;
  }
}
