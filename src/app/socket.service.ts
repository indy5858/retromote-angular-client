import {Injectable} from '@angular/core';
import * as io from 'socket.io-client';

@Injectable()
export class SocketService {

  private socket;

  constructor() {}

  connect(): void {
    this.socket = io('http://localhost:3000');

    this.socket.on('ping', (data) => {
      console.log('Received message from Websocket Server' + data);
    });

    return;
  }

  ping(): void {
    this.socket.emit('ping', 'pong' );
  }

}
