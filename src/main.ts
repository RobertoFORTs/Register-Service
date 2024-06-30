import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  app.useGlobalPipes(
    new ValidationPipe({
      validateCustomDecorators: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('API Climatic Consumer')
    .setDescription(
      'Documentação que reúne os endpoints da API Climatic Consumer, que consome a API OpenWeatherMap e retorna informações climáticas de uma cidade específica.',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('', app, document);

  await app.listen(5000);
}

bootstrap();
