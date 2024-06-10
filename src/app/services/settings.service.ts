import { Injectable } from '@angular/core';
import {LocalstorageService} from "./localstorage.service";

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(private localstorageService: LocalstorageService) { }

  private apiURL: string = "http://192.168.178.69:5000/api";

  setApiURL(url: string) {
    this.apiURL = url;
    this.localstorageService.set(this, 'apiURL', url);
  }

  getApiURL() {
    return this.apiURL;
  }
}
