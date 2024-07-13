// ====== IMPORTS ======
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { static as expose } from 'express';
import { ConfigService } from '@nestjs/config';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Expose Public Folder
  app.use(expose('public'));
  // Database Connection
  const configService = app.get(ConfigService);
  // Get the PORT 
  const port = configService.get('DATABASE_PORT');

  await app
    .listen(port || 3375)
    .then(() => {
      console.log('Current Database URL: ', configService.get('DATABASE_NAME'));
      console.log(`Application is running on port`, configService.get('DATABASE_PORT'));
    })
    .catch((err) => {
      console.error('Error while starting application: ', err.message);
    });
}
bootstrap();
