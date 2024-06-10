import {Injectable} from '@angular/core';
import {NotificationType} from "../enums/notification-type";

@Injectable({
  providedIn: 'root'
})
export class NotifierService {

  private viewing: boolean = false;
  private title: string = '';
  private message: string = '';
  private type: string = '';

  constructor() { }

  shouldView() {
    return this.viewing;
  }

  getTitle() {
    return this.title;
  }

  getMessage() {
    return this.message;
  }

  stopViewing() {
    this.viewing = false;
  }

  openNotification(title: string, message: string, type: NotificationType = NotificationType.INFO, duration: number = 5000) {
    this.title = title;
    this.message = message;
    this.viewing = true;
    this.type = type;
    setTimeout(() => this.stopViewing(), duration);
  }

  getType() {
    return this.type;
  }
}
