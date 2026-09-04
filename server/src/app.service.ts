import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Injectable()
export class AppService {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  getHello(): string {
    return 'Hello from Bharat Knowledge API!';
  }

  getHealth(): {
    success: boolean;
    service: string;
    database: string;
  } {
    const connected = this.connection.readyState === 1;
    return {
      success: connected,
      service: 'bharat-knowledge-api',
      database: connected ? 'connected' : 'disconnected',
    };
  }
}
