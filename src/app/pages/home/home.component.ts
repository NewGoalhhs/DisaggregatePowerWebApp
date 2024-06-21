import {Component, OnInit} from '@angular/core';
import {ApplianceInformationComponent} from "../../components/appliance-information/appliance-information.component";
import {NgForOf} from "@angular/common";
import {Appliance} from "../../classes/appliance";
import {Router} from "@angular/router";
import {PopupService} from "../../services/popup.service";
import {ApiService} from "../../services/api.service";
import {SocketService} from "../../services/socket.service";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ApplianceInformationComponent,
    NgForOf
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  homeData: Appliance[] = [];
  currentDatetime: string = '';
  currentPowerUsage: number = 0;

  constructor(
    private router: Router,
    private popupService: PopupService,
    private apiService: ApiService,
    private socketService: SocketService) {

  }

  getHomeData(): Appliance[] {
    return this.homeData;
  }

  getCurrentDatetime(): string {
    return this.currentDatetime;
  }

  getCurrentPowerUsage(): number {
    return this.currentPowerUsage;
  }

  ngOnInit(): void {
    this.socketService.onHome((data: any) => {
      this.homeData = [];
      Object.entries(data['predictions']).forEach(([key, value]) => {
        const id = parseInt(key);
        if (
          typeof value !== 'object' ||
          value === null ||
          !value.hasOwnProperty('name') ||
          !value.hasOwnProperty('probabilities') ||
          !value.hasOwnProperty('predictions')
        ) return;
        // @ts-ignore
        const name = value['name'];
        // @ts-ignore
        const probability = value['probabilities'];
        // @ts-ignore
        const prediction = value['predictions'];
        if (typeof prediction === 'number' && typeof probability === 'number' && typeof name === 'string') {
          this.homeData.push(new Appliance(id, name, prediction === 1, probability));
        }
      })
      this.currentDatetime = data['current_datetime'];
      this.currentPowerUsage = data['power_usage'];
    })
  }
}
