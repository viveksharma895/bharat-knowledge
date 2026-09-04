import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { getConnectionToken } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const logger = new Logger('Bootstrap');

  app.enableCors({
    origin: [
      'http://localhost:3000',
      configService.get<string>('ADMIN_ORIGIN') || 'http://localhost:3002',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  app.setGlobalPrefix('api/v1');

  app.use(cookieParser());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  const connection = app.get<Connection>(getConnectionToken());

  connection.on('connected', () => {
    logger.log('MongoDB connected successfully');
  });

  connection.on('error', (error: unknown) => {
    logger.error(
      'MongoDB connection error',
      error instanceof Error ? error.stack : String(error),
    );
  });

  connection.on('disconnected', () => {
    logger.warn('MongoDB disconnected');
  });

  const config = new DocumentBuilder()
    .setTitle('Bharat Knowledge API')
    .setDescription('REST API for Bharat Knowledge — an editorial knowledge platform')
    .setVersion('1.0')
    .addTag('People', 'Manage people profiles')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = configService.get<number>('PORT') ?? 3001;

  await app.listen(port);
  logger.log(`NestJS application started on http://localhost:${port}/api/v1`);
  logger.log(`Swagger documentation available at http://localhost:${port}/api`);
}
bootstrap();
