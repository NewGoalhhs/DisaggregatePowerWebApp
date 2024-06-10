import { Component } from '@angular/core';
import {SettingsService} from "../../services/settings.service";
import {Field} from "../../classes/field";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {
  constructor(private settingsService: SettingsService) {
  }

  getFields(): Field[] {
    let fields: Field[] = [];
    // Get all the fields of the settings service
    for (let entry in Object.entries(this.settingsService)) {
      let key = entry[0];
      let value = entry[1];
      let type = typeof value;
      fields.push(new Field(type, key, value));
    }
    return fields;
  }

  save() {

  }
}
