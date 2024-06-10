import { Component } from '@angular/core';
import {NotifierService} from "../../services/notifier.service";

@Component({
  selector: 'app-notifier',
  standalone: true,
  imports: [],
  templateUrl: './notifier.component.html',
  styleUrl: './notifier.component.css'
})
export class NotifierComponent {

  constructor(private notifierService: NotifierService) { }

  shouldView() {
    return this.notifierService.shouldView();
  }

  getTitle() {
    return this.notifierService.getTitle();
  }

  getMessage() {
    return this.notifierService.getMessage();
  }

  getType() {
    return this.notifierService.getType();
  }

  closeNotifier() {
    this.notifierService.stopViewing();
  }
}
