import { Injectable, Logger } from '@nestjs/common';
import { CityType } from 'src/common/types';
import { AddPinDto } from '../dto/AddPinDto';

@Injectable()
export class WebsocketService {
  private readonly logger = new Logger(WebsocketService.name);
  private pins: CityType[] = [
    {
      latitude: 35.89499839846358,
      longitude: 14.421597190148447,
      name: 'Malta',
      description: 'Malta is an awesome place.',
    },
    {
      latitude: 51.50045312618593,
      longitude: -0.13324275063382496,
      name: 'London',
      description: 'London is cold city.',
    },
    {
      latitude: 38.433697514521626,
      longitude: 27.156610267434708,
      name: 'İzmir',
      description: 'İzmir is best city ever.',
    },
  ];

  constructor() {
    this.logger.warn('>> Websocket service instance created.');

    // TODO Create websocket server here.
  }

  async addPin(pin: AddPinDto) {
    this.pins.push(pin);

    return true;
  }

  async getPins() {
    return this.pins;
  }
}
