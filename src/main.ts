import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter, CustomExceptionFilter } from './common/filters';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Todo CRUD APIs')
    .setDescription('Simple CRUD APIs document for Todo app')
    .setVersion('1.0')
    .build();

  const documentFactory = () =>
    SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, documentFactory);

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
