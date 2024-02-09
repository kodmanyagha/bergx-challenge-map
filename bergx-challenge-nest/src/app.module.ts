import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import appConfig from 'src/config/app.configuration';
import { WebsocketModule } from 'src/modules/websocket/websocket.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
    }),
    WebsocketModule,
  ],
  providers: [Logger],
})
export class AppModule {}
