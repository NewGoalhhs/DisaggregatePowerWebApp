import {Injectable, OnInit} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  constructor() { }

  public get(obj: Object, key: string): any {
    let localStorageObj = localStorage.getItem(obj.constructor.name) ?? JSON.stringify({});
    let parsed = JSON.parse(localStorageObj);
    return parsed.get(key) ?? null;
  }

  public set(obj: Object, key: string, value: string): any {
    let localStorageObj = localStorage.getItem(obj.constructor.name) ?? JSON.stringify({});
    let parsed = JSON.parse(localStorageObj);
    parsed.set(key, value);
    localStorage.setItem(obj.constructor.name, JSON.stringify(parsed));
  }
}
