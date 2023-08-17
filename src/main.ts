import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, //Indica que o pipe irá transformar os JSONs recebidos em objetos das classes referênciadas
      whitelist: true, //Vai ignorar todas as propriedades contidas no JSON que não estiver no DTO
      forbidNonWhitelisted: true //Lançar um erro se mandar propriedades no JSON que não estiver contidas no DTO
    })
  );
  
  useContainer(app.select(AppModule), { fallbackOnErrors: true }); //Parametrizando para que o class-validator tenha o mesmo formato que o nestjs para injeção de dependências.

  await app.listen(3000);
}
bootstrap();
