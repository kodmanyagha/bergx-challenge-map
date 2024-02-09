import { LoggerService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule,
} from 'nest-winston';
import { AppConfig } from 'src/config/app.configuration';
import * as winston from 'winston';
import 'winston-daily-rotate-file';

export function createWinstonLogger(
  configService: ConfigService<AppConfig>,
): LoggerService {
  const debug = configService.get('APP_DEBUG');
  const logLevel = debug ? 'debug' : configService.get('LOG_LEVEL');
  const transports = [];

  // TODO Add different transports (file, console, daily rotate)
  transports.push(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        nestWinstonModuleUtilities.format.nestLike(),
      ),
    }),
  );

  return WinstonModule.createLogger({
    level: logLevel,
    transports: transports,
  });
}
