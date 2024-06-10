import {Component, OnInit} from '@angular/core';
import {ApplianceInformationComponent} from "../../components/appliance-information/appliance-information.component";
import {NgForOf} from "@angular/common";
import {Appliance} from "../../classes/appliance";
import {Router} from "@angular/router";
import {PopupService} from "../../services/popup.service";

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
  appliances: Array<Appliance> = [
    new Appliance(0, "Microwave", false)
  ];

  constructor(private router: Router, private popupService: PopupService) {
  }

  getAppliances(): Array<Appliance> {
    return this.appliances;
  }

  ngOnInit(): void {
  }
}
