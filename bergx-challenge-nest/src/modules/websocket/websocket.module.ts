import { Module } from '@nestjs/common';
import { WebsocketController } from 'src/modules/websocket/controllers/websocket.controller';
import { WebsocketService } from 'src/modules/websocket/services/websocket.service';

@Module({
  controllers: [WebsocketController],
  providers: [WebsocketService],
  exports: [WebsocketService],
})
export class WebsocketModule {}
