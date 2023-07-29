import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { EventService } from './event.service';

@WebSocketGateway({ cors: true })
export class EventGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private logger: Logger = new Logger('MessageGateway');
  @WebSocketServer() wss: Server;

  constructor(private readonly eventService: EventService) {
    this.eventService.subscriber.on('message', (channel, message) => {
      this.logger.log(`${message} from publisher to subscriber`);
      this.wss.emit('receiveMessage', message);
    });
  }

  afterInit() {
    this.logger.log('Initialized');
    this.eventService.subscribe();
    this.wss.on('connection', (socket) => {
      console.log(socket.id);
    });
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client Disconnected: ${client.id}`);
  }

  handleConnection(client: Socket) {
    this.logger.log(`Client Connected: ${client.id}`);
  }

  @SubscribeMessage('sendMessage')
  handleSendMessage(client: Socket, payload: string): void {
    this.eventService.publish(`message from wss to publisher ${payload}`);
  }
}
