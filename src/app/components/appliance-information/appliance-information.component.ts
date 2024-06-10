import {Component, Input, OnInit} from '@angular/core';
import {Appliance} from "../../classes/appliance";

@Component({
  selector: 'app-appliance-information',
  standalone: true,
  imports: [],
  templateUrl: './appliance-information.component.html',
  styleUrl: './appliance-information.component.css'
})
export class ApplianceInformationComponent implements OnInit {
  @Input() appliance: Appliance = new Appliance(0, "No appliance was given", false);

  getIsOnHtmlClass(): string {
    if (this.appliance.getIsOn()) {
      return "is-on";
    } else {
      return "is-off";
    }
  }

  ngOnInit(): void {

  }
}
