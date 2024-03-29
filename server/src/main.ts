import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type'],
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  });
  app.use(cookieParser());
  await app.listen(8080, () => {
    console.log('Server Start!');
  });
}
bootstrap();
