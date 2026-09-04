import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

vi.mock('@nestjs/mongoose', () => ({
  Prop: () => () => {},
  Schema: () => () => {},
  SchemaFactory: {
    createForClass: vi.fn(() => ({ index: vi.fn() })),
  },
  getModelToken: (name: string) => `Token_${name}`,
  getConnectionToken: () => 'MockConnection',
  InjectConnection: () => () => {},
  InjectModel: (name: string) => `Token_${name}`,
  MongooseModule: {
    forFeature: vi.fn().mockReturnValue({ module: class MockModule {} }),
  },
}));

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useValue: {
            getHello: () => 'Hello from Bharat Knowledge API!',
            getHealth: () => ({
              success: true,
              service: 'bharat-knowledge-api',
              database: 'connected',
            }),
          },
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello from Bharat Knowledge API!"', () => {
      expect(appController.getHello()).toBe(
        'Hello from Bharat Knowledge API!',
      );
    });
  });

  describe('health', () => {
    it('should report connected when the database connection is ready', () => {
      expect(appController.getHealth()).toEqual({
        success: true,
        service: 'bharat-knowledge-api',
        database: 'connected',
      });
    });
  });
});
