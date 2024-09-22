import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import compression from 'compression';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { setupSwagger } from './common/swagger';
import { I18nValidationExceptionFilter, I18nValidationPipe } from 'nestjs-i18n';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get<ConfigService>(ConfigService);

  app.enableCors({
    credentials: true,
    origin: true,
    optionsSuccessStatus: 200,
    allowedHeaders:
      'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    preflightContinue: false,
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  });

  app.use(helmet());
  app.use(compression());

  app.useGlobalPipes(
    new I18nValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalFilters(
    new I18nValidationExceptionFilter({ detailedErrors: false }),
  );

  const port = Number(configService.get<number>('APP_PORT')) || 3000;

  setupSwagger(app, port, configService);
  await app.listen(port);

  console.log(`Application is running on: ${port}`);
}
bootstrap();
