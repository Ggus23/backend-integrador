import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser()); // 👈 importante para leer cookies

  app.setGlobalPrefix('api-integrador/v1');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // 🛡️ Habilitar CORS con cookies
  app.enableCors({
    origin: 'http://localhost:3000', // Reemplaza con la URL de tu frontend en producción
    credentials: true,
  });

  // Swagger
  const config = new DocumentBuilder()
    .setTitle("Integrador API")
    .setDescription("API para el proyecto integrador")
    .setVersion("1.0")
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("docs", app, document);

  // Escuchar en puerto
  const port = parseInt(process.env.PORT ?? '3001');
  if (isNaN(port)) {
    console.error('Error: PORT environment variable is not a valid number. Using default port 3001.');
    await app.listen(3001);
  } else {
    await app.listen(port);
  }
}
bootstrap();