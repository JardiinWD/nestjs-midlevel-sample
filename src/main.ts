// ====== IMPORTS ======
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { static as expose } from 'express';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Expose Public Folder
  app.use(expose('public'));
  await app
    .listen(process.env.NEST_PORT || 3375)
    .then(() => {
      console.log('Current Database URL: ', process.env.DATABASE_NAME);
      console.log(`Application is running on port: ${process.env.NEST_PORT}`);
    })
    .catch((err) => {
      console.error('Error while starting application: ', err);
    });
}
bootstrap();
