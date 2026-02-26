import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { TransformInterceptor } from './interceptors/transform.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const client_url = configService.get<string>('CLIENT_URL')!;

  // app.enableCors();
  app.enableCors({
    origin: ['http://localhost:5173', client_url],
    credentials: true, // Allow cookies
  });

  app.use(cookieParser());

  app.setGlobalPrefix('api');

  // Global exception filter for consistent error responses
  app.useGlobalFilters(new HttpExceptionFilter());

  // Global response format:
  app.useGlobalInterceptors(new TransformInterceptor());

  const config = new DocumentBuilder()
    .setTitle('Saahithi')
    .setDescription('API documentation for Saahithi')
    .setVersion('1.0')
    .addBearerAuth() // Optional: if API uses Bearer token authentication
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document); // The documentation will be available at http://localhost:3060/api/api-docs

  await app.listen(process.env.PORT ?? 3060);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
