import { Body, Controller, Get, Post } from '@nestjs/common';
import { AddPinDto } from 'src/modules/websocket/dto/AddPinDto';
import { WebsocketService } from 'src/modules/websocket/services/websocket.service';

@Controller('ws')
export class WebsocketController {
  constructor(private readonly websocketService: WebsocketService) {}

  @Post('addPin')
  async addPin(@Body() input: AddPinDto) {
    return await this.websocketService.addPin(input);
  }

  @Get('getPins')
  async getPins() {
    return await this.websocketService.getPins();
  }
}
