import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

/**
 * * nest generate resource
 * ? Genera toda la carpeta con lo necesario, trae el DTO, la entity, controller y todo.
 * 
 * ======================================================================================
 * Intalamos el ORM para mysql
 * npm i --save @nestjs/typeorm typeorm mysql2
 * 
 * Le pegamos una configurada en e appModule.
 * Le agregamos el setGlobalPrefix
 * ======================================================================================
 * Configuramos la entity we
 * 
 * ======================================================================================
 * 
 * Para validar los DTO
 * npm i class-validator class-transformer
 **/

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
      new ValidationPipe({
      whitelist: true,
      transform: true
    })
  )
  await app.listen(3000);
}
bootstrap();
