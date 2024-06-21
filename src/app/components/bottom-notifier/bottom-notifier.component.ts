import { Component } from '@angular/core';
import {NotifierService} from "../../services/notifier.service";

@Component({
  selector: 'app-bottom-notifier',
  standalone: true,
  imports: [],
  templateUrl: './bottom-notifier.component.html',
  styleUrl: './bottom-notifier.component.css'
})
export class BottomNotifierComponent {

  constructor(private notifierService: NotifierService) {
  }

  shouldView() {
    return this.notifierService.shouldViewBottom();
  }

  getTitle() {
    return this.notifierService.getTitleBottom();
  }

  getMessage() {
    return this.notifierService.getMessageBottom();
  }

  getType() {
    return this.notifierService.getTypeBottom();
  }

  closeNotifier() {
    this.notifierService.stopViewingBottom();
  }
}
