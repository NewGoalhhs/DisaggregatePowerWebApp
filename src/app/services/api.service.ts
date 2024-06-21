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
    return this.basicApiCall('api/appliance', Method.GET);
  }

  getTrainDataOptions() {
    return this.basicApiCall('api/train/options', Method.GET);
  }

  getAdvancedTrainDataOptions() {
    return this.basicApiCall('api/train/advanced/options', Method.GET);
  }

  getAdvancedPredictDataOptions() {
    return this.basicApiCall('api/predict/advanced/options', Method.GET);
  }

  getPredictDataOptions() {
    return this.basicApiCall('api/predict/options', Method.GET);
  }

  trainModel(applianceId: any, model: string, epochs: any) {
    return this.basicApiCall('api/train/start', Method.POST, {
      appliance_id: applianceId,
      model: model,
      epochs: epochs
    });
  }

  advancedTrainModel(applianceIds: any, epochs: any) {
    return this.basicApiCall('api/train/advanced/start', Method.POST, {
      appliance_ids: applianceIds,
      epochs: epochs,
    });
  }

  predictModel(datetime: string[], mainPower: string[]) {
    return this.basicApiCall('api/predict/start', Method.POST, {
      datetime: datetime,
      main_power: mainPower
    });
  }

  advancedPredictModel(model: string[], datetime: string[], mainPower: string[]) {
    return this.basicApiCall('api/predict/advanced/start', Method.POST, {
      model: model,
      datetime: datetime,
      main_power: mainPower
    });
  }

  getHomeListener() {
    return this.basicApiCall('webhook', Method.GET);
  }
}
