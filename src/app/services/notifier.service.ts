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
  private oldListener: any;

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
    this.oldListener = setTimeout(() => this.stopViewing(), duration);
  }

  getType() {
    return this.type;
  }

  setListener(listener: string) {
    this.notifierListener = listener;
    this.localStorageService.set(this, 'notifierListener', listener);

    this.socketService.getSocket().on(this.getListener(), (data: any) => {
      if (this.oldListener) {
        clearTimeout(this.oldListener);
      }
      this.openNotification(data['title'], data['message'], data['type'], data['duration']);
    });
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


  private notifierListenerBottom: string = '';

  private viewingBottom: boolean = false;
  private titleBottom: string = '';
  private messageBottom: string = '';
  private typeBottom: string = '';
  private oldListenerBottom: any;

  shouldViewBottom() {
    return this.viewingBottom;
  }

  getTitleBottom() {
    return this.titleBottom;
  }

  getMessageBottom() {
    return this.messageBottom;
  }

  stopViewingBottom() {
    this.viewingBottom = false;
  }

  openNotificationBottom(title: string, message: string, type: NotificationType = NotificationType.INFO, duration: number = 5000) {
    this.titleBottom = title;
    this.messageBottom = message;
    this.viewingBottom = true;
    this.typeBottom = type;
    this.oldListenerBottom = setTimeout(() => this.stopViewingBottom(), duration);
  }

  getTypeBottom() {
    return this.typeBottom;
  }

  setListenerBottom(listener: string) {
    this.notifierListenerBottom = listener;
    this.localStorageService.set(this, 'notifierListenerBottom', listener);

    this.socketService.getSocket().on(this.getListenerBottom(), (data: any) => {
      if (this.oldListenerBottom) {
        clearTimeout(this.oldListenerBottom);
      }
      this.openNotificationBottom(data['title'], data['message'], data['type'], data['duration']);
    });
  }

  getListenerBottom() {
    return this.notifierListenerBottom;
  }

  resetListenerBottom() {
    this.notifierListenerBottom = '';
    this.localStorageService.set(this, 'notifierListenerBottom', '');
  }

  loadListenerBottom() {
    this.setListenerBottom(this.localStorageService.get(this, 'notifierListenerBottom'));
  }
}
