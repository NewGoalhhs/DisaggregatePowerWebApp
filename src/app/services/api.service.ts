import { Injectable } from '@angular/core';
import {SettingsService} from "./settings.service";
import {Method} from "../enums/method";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private settingsService: SettingsService) { }

  basicApiCall(uri: string, method: Method, body?: any) {
    return fetch(this.settingsService.getApiURL() + uri, {
      method: method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Data-Type': 'json',
      },
      body: JSON.stringify(body)
    }).then(r => r.json());
  }

  getAppliances(): Promise<any> {
    return this.basicApiCall('/appliance', Method.GET);
  }

  getTrainDataOptions() {
    return this.basicApiCall('/train_options', Method.GET);
  }

  trainModel(applianceId: any, model: string, epochs: any) {
    return this.basicApiCall('/train/start', Method.POST, {
      appliance_id: applianceId,
      model: model,
      epochs: epochs
    });
  }
}
