// ====== IMPORTS ======
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app
    .listen(process.env.NEST_PORT || 3375)
    .then(() => {
      console.log(`Application is running on port: ${process.env.NEST_PORT}`);
    }).catch((err) => {
      console.error("Error while starting application: ", err);
    });
}
bootstrap();
