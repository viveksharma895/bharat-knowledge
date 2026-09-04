import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { getConnectionToken } from '@nestjs/mongoose';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

process.env.MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb://localhost:27017/bharat_knowledge_test';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(getConnectionToken())
      .useValue({ readyState: 1, on: jest.fn() })
      .compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api/v1');
    await app.init();
  });

  it('/api/v1/ (GET)', () => {
    return request.default(app.getHttpServer())
      .get('/api/v1/')
      .expect(200)
      .expect('Hello from Bharat Knowledge API!');
  });

  it('/api/v1/health (GET)', () => {
    return request.default(app.getHttpServer())
      .get('/api/v1/health')
      .expect(200)
      .expect({
        success: true,
        service: 'bharat-knowledge-api',
        database: 'connected',
      });
  });
});
