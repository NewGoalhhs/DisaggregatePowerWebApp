import { Routes } from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {TrainModelComponent} from "./pages/train-model/train-model.component";
import {SettingsComponent} from "./pages/settings/settings.component";
import {PredictComponent} from "./pages/predict/predict.component";
import {AdvancedTrainingComponent} from "./pages/advanced-training/advanced-training.component";
import {AdvancedPredictingComponent} from "./pages/advanced-predicting/advanced-predicting.component";

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'popup', component: HomeComponent },
  { path: 'popup/settings', component: HomeComponent },
  { path: 'popup/train', component: HomeComponent },
  { path: 'popup/advanced', component: HomeComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'train', component: TrainModelComponent },
  { path: 'predict', component: PredictComponent },
  { path: 'advanced/training', component: AdvancedTrainingComponent },
  { path: 'advanced/predicting', component: AdvancedPredictingComponent }
];
