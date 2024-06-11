import {Injectable, OnInit} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  constructor() { }

  public get(obj: Object, key: string): any {
    let localStorageObj = localStorage.getItem(obj.constructor.name) ?? JSON.stringify({});
    console.log(localStorageObj);
    let parsed = JSON.parse(localStorageObj);
    console.log(parsed);
    return parsed[key] ?? null;
  }

  public set(obj: Object, key: string, value: any): any {
    let localStorageObj = localStorage.getItem(obj.constructor.name) ?? JSON.stringify({});
    console.log(localStorageObj);
    let parsed = JSON.parse(localStorageObj);
    console.log(parsed);
    parsed[key] = value;
    console.log(parsed);
    localStorage.setItem(obj.constructor.name, JSON.stringify(parsed));
  }
}
