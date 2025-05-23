
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true
    }),
  );
  const configService = app.get(ConfigService);
  const PORT = configService.get<number>('PORT');
  app.setGlobalPrefix('api/v1', { exclude: ['/'] });

  await app.listen(PORT ?? 8080);
  Logger.log(
    ` Microservice ready to receive Redis messages in PORT - ${PORT}\n Environment - `,
  );
}
bootstrap();
