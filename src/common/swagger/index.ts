// src/common/swagger.ts
import { INestApplication, Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import {
  SWAGGER_API_NAME,
  SWAGGER_API_DESCRIPTION,
  SWAGGER_API_CURRENT_VERSION,
} from './constants';

export const setupSwagger = (
  app: INestApplication,
  port: number,
  configService: ConfigService,
) => {
  const server =
    configService.get<string>('SWAGGER_SERVER') || `http://localhost:${port}/`;

  const docs = `${server}api`;

  const options = new DocumentBuilder()
    .setTitle(SWAGGER_API_NAME)
    .setDescription(SWAGGER_API_DESCRIPTION)
    .setVersion(SWAGGER_API_CURRENT_VERSION)
    .addBearerAuth()
    .addServer(server)
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  const logger = new Logger('Documentation');
  logger.log(`API Documentation for "${server}" is available at "${docs}"`);
};
