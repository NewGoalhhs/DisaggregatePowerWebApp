import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {ApiService} from "../../services/api.service";
import {Appliance} from "../../classes/appliance";
import {NgForOf} from "@angular/common";
import {NotifierService} from "../../services/notifier.service";
import {NotificationType} from "../../enums/notification-type";

@Component({
  selector: 'app-advanced-training',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgForOf
  ],
  templateUrl: './advanced-training.component.html',
  styleUrl: './advanced-training.component.css'
})
export class AdvancedTrainingComponent implements OnInit {
  appliances: Appliance[] = [];

  selectedAppliances: Appliance[] = [];

  form: FormGroup = new FormGroup({
    appliance: new FormControl(''),
    epochs: new FormControl(''),
  })

  constructor(private apiService: ApiService, private notifierService: NotifierService) { }

  ngOnInit() {
    this.apiService.getAppliances().then((data: any) => {
      for (let appliance of data) {
        this.appliances.push(new Appliance(appliance['id'], appliance['name'], true));
      }
    });

    this.form.controls['appliance'].valueChanges.subscribe((value) => {
      this.appliances.forEach((appliance) => {
        if (appliance.getId().toString() === value) {
          this.selectedAppliances.push(appliance);
          console.log(this.selectedAppliances)
        }
      });
    });
  }

  getSelectedAppliances() {
    return this.selectedAppliances;
  }

  getAvailableAppliances() {
    // Return the difference between all appliances and selected appliances
    return this.appliances.filter(appliance => !this.selectedAppliances.includes(appliance));
  }

  removeAppliance(id: number) {
    for (let i = 0; i < this.selectedAppliances.length; i++) {
      if (this.selectedAppliances[i].getId() === id) {
        this.selectedAppliances.splice(i, 1);
      }
    }
  }

  startTraining() {
    let appliances = this.selectedAppliances.map((appliance) => appliance.getId());
    let epochs = this.form.controls['epochs'].value;
    this.apiService.advancedTrainModel(appliances, epochs).then(r => {
      if (r['status'] === 'success') {
        this.notifierService.openNotification('Training completed', 'The training has been completed successfully', NotificationType.SUCCESS);
      } else {
        this.notifierService.openNotification('Training failed', 'The training has failed', NotificationType.ERROR);
      }
      this.notifierService.resetListenerBottom();
    });
    this.notifierService.openNotification('Training started', 'The training has been started', NotificationType.INFO);
    this.notifierService.setListenerBottom('advanced_training_notification');
  }
}
