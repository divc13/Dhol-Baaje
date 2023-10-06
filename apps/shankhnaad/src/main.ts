import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { applySchemaDiffFromFile } from '@logosphere/fluree';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const ledger = process.env.FLUREE_LEDGER || 'local/shankhnaad';
  await applySchemaDiffFromFile(ledger, 'shankhnaad-fluree-schema.json');
  await app.listen(3000, '0.0.0.0');
}
bootstrap();
