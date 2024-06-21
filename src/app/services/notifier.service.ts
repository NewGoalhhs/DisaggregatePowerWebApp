import {Injectable, OnInit} from '@angular/core';
import {NotificationType} from "../enums/notification-type";
import {LocalstorageService} from "./localstorage.service";
import {SocketService} from "./socket.service";

@Injectable({
  providedIn: 'root'
})
export class NotifierService {

  private notifierListener: string = '';

  private viewing: boolean = false;
  private title: string = '';
  private message: string = '';
  private type: string = '';

  constructor(private localStorageService: LocalstorageService, private socketService: SocketService) { }

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

  setListener(listener: string) {
    this.notifierListener = listener;
    this.localStorageService.set(this, 'notifierListener', listener);
    console.log(this.getListener())
    this.socketService.getSocket().on(this.getListener(), (data: any) => {
      this.openNotification(data['title'], data['message'], data['type'], data['duration']);
    })
  }

  getListener() {
    return this.notifierListener;
  }

  resetListener() {
    this.notifierListener = '';
    this.localStorageService.set(this, 'notifierListener', '');
  }

  loadListener() {
    this.setListener(this.localStorageService.get(this, 'notifierListener'));
  }
}
