import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as express from 'express';
import * as https from 'https';
import { AppModule } from './app.module';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);

    app.use(express.json());

    await app.listen(process.env.PORT ?? 4000);

    const httpServer = app.getHttpServer();
    const address = httpServer.address();
    const host = address.address === '::' ? 'localhost' : address.address;
    const port = address.port;
    const protocol = httpServer instanceof https.Server ? 'https' : 'http';

    Logger.log(
      `Server is running on version: ${process.env.VERSION}`,
      AppModule.name,
    );
    Logger.log(
      `Server is running on ${protocol}://${host}:${port}`,
      AppModule.name,
    );
  } catch (error) {
    Logger.error(`Error starting server: ${error}`, AppModule.name);
    process.exit(1);
  }
}
bootstrap();
