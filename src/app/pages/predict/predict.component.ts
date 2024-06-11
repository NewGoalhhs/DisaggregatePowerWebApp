import {Component, model} from '@angular/core';
import {Appliance} from "../../classes/appliance";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ApiService} from "../../services/api.service";
import {NotifierService} from "../../services/notifier.service";
import {NotificationType} from "../../enums/notification-type";
import {NgForOf, NgIf} from "@angular/common";
import {LocalstorageService} from "../../services/localstorage.service";

@Component({
  selector: 'app-predict',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgForOf,
    NgIf
  ],
  templateUrl: './predict.component.html',
  styleUrl: './predict.component.css'
})
export class PredictComponent {
  currentDatetime: string = new Date().toISOString().slice(0, 19).replace('T', ' ');
  private modelPredictionProbabilities: any[] = [];

  form: FormGroup = this.formBuilder.group({
    model: new FormControl('', Validators.required),
    datetime: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{2}-[0-9]{2}-[0-9]{4} [0-9]{2}:[0-9]{2}:[0-9]{2}$')]),
    mainPower: new FormControl('', [Validators.required, Validators.min(0)]),
  });


  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private notifierService: NotifierService,
    private localstorageService: LocalstorageService
  ) {}

  getModelPredictionProbabilities(): any[] {
    const modelPredictionProbabilities = this.modelPredictionProbabilities;
    if (modelPredictionProbabilities === null) {
      return [];
    }
    return Object.entries(modelPredictionProbabilities);
  }

  private mainPower: number = 0;

  getMainPower() {
    return this.mainPower;
  }

  ngOnInit() {
    this.form.controls['mainPower'].valueChanges.subscribe(value => {
      this.mainPower = value;
    });
    this.modelPredictionProbabilities = this.localstorageService.get(this, 'modelPredictionProbabilities');
  }

  predict() {
    // reformat the datetime to match the format in the database

    let datetime = this.form.get('datetime')?.value;
    datetime = [datetime.split('T').join(' ') + ':00'];
    const mainPower = [this.form.get('mainPower')?.value];

    this.apiService.predictModel(datetime, mainPower).then(data => {
      if (data['status'] === 'success') {
        this.notifierService.openNotification('Predicting Complete', 'The model has finished predicting.', NotificationType.SUCCESS, 10000)
        this.modelPredictionProbabilities = data['data'];
        this.localstorageService.set(this, 'modelPredictionProbabilities', this.modelPredictionProbabilities);
      } else {
        this.notifierService.openNotification('Predicting Failed', 'The model failed to predict. Try again.', NotificationType.ERROR, 10000)
      }
    });
    this.notifierService.openNotification('Predicting Started', 'The model has started predicting. This may take a few minutes.', NotificationType.INFO, 5000)
  }

  round(number: number) {
    return Math.round(number * 100) / 100;
  }

  test(modelPredictionProbabilityElement: any) {
    return typeof modelPredictionProbabilityElement;
  }
}
