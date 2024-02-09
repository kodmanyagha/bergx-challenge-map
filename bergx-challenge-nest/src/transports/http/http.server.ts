import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { useContainer } from 'class-validator';
import { AppModule } from 'src/app.module';
import { createWinstonLogger } from 'src/common/logger/winston/winston.logger';
import { AppConfig } from 'src/config/app.configuration';

export async function startHttpServer() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get<ConfigService<AppConfig>>(
    ConfigService<AppConfig>,
  );
  const httpHost = configService.get('HTTP_HOST');
  const httpPort = configService.get('HTTP_PORT');
  const logger = createWinstonLogger(configService);

  app.useLogger(logger);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  const config = new DocumentBuilder()
    .setTitle(configService.get('SWAGGER_TITLE'))
    .setDescription(configService.get('SWAGGER_DESCRIPTION'))
    .setVersion(configService.get('SWAGGER_VERSION'))
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(configService.get('SWAGGER_PATH'), app, document);
  await app.listen(httpPort, httpHost, () => {
    logger.log(`HTTP server listening on ${httpHost}:${httpPort}`);
  });
}
