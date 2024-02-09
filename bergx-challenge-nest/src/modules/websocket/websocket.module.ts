import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { WebsocketController } from 'src/modules/websocket/controllers/websocket.controller';
import { WebsocketService } from 'src/modules/websocket/services/websocket.service';

@Module({
  controllers: [WebsocketController],
  providers: [WebsocketService, ConfigService],
  exports: [WebsocketService],
})
export class WebsocketModule {}
