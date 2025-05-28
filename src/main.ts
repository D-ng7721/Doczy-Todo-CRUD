import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter, CustomExceptionFilter } from './common/filters';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      transformOptions: {
        exposeUnsetFields: false,
      },
    }),
  );

  app.useGlobalFilters(
    ...[new HttpExceptionFilter(), new CustomExceptionFilter()],
  );
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap().catch(console.error);
