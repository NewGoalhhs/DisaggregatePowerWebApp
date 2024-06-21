import { Injectable } from '@angular/core';
import {io, Socket} from 'socket.io-client';
import {SettingsService} from "./settings.service";

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private socket: Socket;

  constructor(private settingsService: SettingsService) {
    this.socket = io(this.settingsService.getSocketURL()).connect();

    this.socket.on('connect', (): void => {
      console.log('connected');
      this.socket.emit('home', {data: 'connected'})
    });
  }

  onHome(func: any) {
    return this.socket.on('home', func);
  }

  getSocket(): Socket {
    return this.socket;
  }
}

