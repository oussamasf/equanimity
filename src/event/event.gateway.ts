import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
} from '@nestjs/websockets';
import { EventService } from './event.service';
import { OnModuleInit } from '@nestjs/common';
import { Server } from 'socket.io';

@WebSocketGateway()
export class EventGateway implements OnModuleInit {
  @WebSocketServer()
  server: Server;

  constructor(private readonly eventService: EventService) {}

  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log(socket.id);
    });
  }

  @SubscribeMessage('room')
  handleMessage(@MessageBody() body: any) {
    console.log(body);
    this.server.emit('ghost', {
      body,
    });
  }
}
