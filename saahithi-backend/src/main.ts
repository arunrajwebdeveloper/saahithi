import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import 'winston-daily-rotate-file';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      transports: [
        // Log to the terminal (Colorful)
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.colorize(),
            winston.format.simple(),
          ),
        }),
        // Log to a file (Rotates every day)
        new winston.transports.DailyRotateFile({
          filename: 'logs/application-%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '14d', // Keeps logs for 14 days
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.json(), // JSON is best for file logs
          ),
        }),
      ],
    }),
  });

  const configService = app.get(ConfigService);
  const client_url = configService.get<string>('CLIENT_URL')!;

  // app.enableCors();
  app.enableCors({
    origin: [client_url],
    credentials: true, // Allow cookies
  });

  app.use(cookieParser());

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strips away any properties that aren't in the DTO
      forbidNonWhitelisted: true, // Throws error if extra properties are sent
      transform: true, // Automatically transforms payloads to DTO instances
    }),
  );

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
