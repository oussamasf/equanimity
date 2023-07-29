import { Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';

@Injectable()
export class EventService {
  private readonly publisher: Redis;
  public subscriber: Redis;

  constructor() {
    // TODO change host to be env var
    const PORT = parseInt(process.env.REDIS_PORT);
    this.publisher = new Redis(PORT, process.env.REDIS_HOST); //6379, 'pubsub'
    this.subscriber = new Redis(PORT, process.env.REDIS_HOST); //
  }

  publish(message: string): void {
    const channel = 'my-channel-1';
    this.publisher.publish(channel, JSON.stringify(message));
  }
  subscribe(): void {
    this.subscriber.subscribe('my-channel-1', (err, count) => {
      if (err) {
        console.error('Failed to subscribe: %s', err.message);
      } else {
        console.log(
          `Subscribed successfully! This client is currently subscribed to ${count} channels.`,
        );
      }
    });
  }
}
