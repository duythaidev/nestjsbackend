
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const PORT = configService.get<number>('PORT');

  await app.listen(PORT ?? 8080);
  Logger.log(
    ` Microservice ready to receive Redis messages in PORT - ${PORT}\n Environment - `,
  );
}
bootstrap();
