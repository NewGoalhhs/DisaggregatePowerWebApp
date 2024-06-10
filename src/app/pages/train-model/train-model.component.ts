import {Component, OnInit} from '@angular/core';
import {Appliance} from "../../classes/appliance";
import {ApiService} from "../../services/api.service";
import {NgForOf} from "@angular/common";
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NotifierService} from "../../services/notifier.service";
import {NotificationType} from "../../enums/notification-type";

@Component({
  selector: 'app-train-model',
  standalone: true,
  imports: [
    NgForOf,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './train-model.component.html',
  styleUrl: './train-model.component.css'
})
export class TrainModelComponent implements OnInit {
  private appliances: Appliance[] = [];
  private models: string[] = [];

  form: FormGroup = this.formBuilder.group({
    appliance: new FormControl(Validators.required),
    model: new FormControl(Validators.required),
    epochs: new FormControl([Validators.required, Validators.min(1), Validators.max(1000)]),
  });


  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private notifierService: NotifierService
  ) {}

  getAppliances(): Appliance[] {
    return this.appliances;
  }

  getModels(): string[] {
    return this.models;
  }

  ngOnInit() {
    this.apiService.getTrainDataOptions().then(data => {
      for (let appliance of data['appliances']) {
        this.appliances.push(new Appliance(appliance.id, appliance.name, appliance.isOn));
      }
      for (let model of data['models']) {
        this.models.push(model);
      }
    })
  }

  train() {
    const applianceId = this.form.get('appliance')?.value;
    const model = this.form.get('model')?.value;
    const epochs = this.form.get('epochs')?.value;

    this.apiService.trainModel(applianceId, model, epochs).then(data => {
      if (data['status'] === 'success') {
        this.notifierService.openNotification('Training Complete', 'The model has completed its training and is now available for predicting.', NotificationType.SUCCESS, 10000)
      } else {
        this.notifierService.openNotification('Training Failed', 'The model failed to train. Please try again.', NotificationType.ERROR, 10000)
      }
    });
    this.notifierService.openNotification('Training Started', 'The model has started training. This may take a few minutes.', NotificationType.INFO, 5000)
  }
}
