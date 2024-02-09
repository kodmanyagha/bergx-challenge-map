import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { bufferToString } from 'src/common/functions';
import { CityType } from 'src/common/types';
import WsConnectionHandler from 'src/modules/websocket/services/utils/ws-connection-handler';
import * as uWS from 'uWebSockets.js';
import { TemplatedApp, WebSocket } from 'uWebSockets.js';
import { AddPinDto } from '../dto/AddPinDto';

export type WsClientDataType = {
  lastHbTime: number;
};

@Injectable()
export class WebsocketService {
  private readonly logger = new Logger(WebsocketService.name);

  private wsServer: TemplatedApp;
  private wsClients: WsConnectionHandler<WsClientDataType>[] = [];

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

  constructor(private readonly appConfig: ConfigService) {
    this.logger.warn('>> Websocket service instance created.');

    this.initWsServer();
    this.startHeartBeatChecker();
  }

  async startHeartBeatChecker() {
    this.wsClients = this.wsClients.filter((item) => item);
    this.logger.debug('Total client: ' + this.wsClients.length);

    this.wsClients.forEach((ws, index) => {
      const sendResult = ws.send(JSON.stringify({ hb: Date.now() }));

      if (sendResult === null) {
        delete this.wsClients[index];
      }
    });

    setTimeout(() => this.startHeartBeatChecker(), 3_000);
  }

  initWsServer() {
    this.wsServer = uWS.App();

    const host = this.appConfig.get('WS_HOST');
    const port = this.appConfig.get('WS_PORT');

    this.wsServer
      .ws('/*', {
        compression: uWS.SHARED_COMPRESSOR,
        maxPayloadLength: 16 * 1024 * 1024,
        idleTimeout: 10,

        open: (ws) => {
          try {
            ws.subscribe('default');

            ws.send(
              JSON.stringify({
                status: 'success',
                data: 'Welcome.',
              }),
            );

            this.wsClients.push(
              new WsConnectionHandler(ws as WebSocket<WsClientDataType>),
            );
          } catch (e) {
            this.logger.error('>> 🚀 e: ' + e.message);
          }
        },

        /* Herhangi bir websocket client'ından sunucuya mesaj geldiğinde
        bu fonksiyon çalışır. */
        message: (ws, message, isBinary) => {
          try {
            const messageStr = bufferToString(message, 'utf-8');
            const messageObj = JSON.parse(messageStr);

            this.logger.warn('Message: ' + JSON.stringify(messageObj));
          } catch (e) {
            // TODO Handle error.
          }
        },

        drain: (ws) => {
          console.log(
            'WebSocket backpressure: ' +
              bufferToString(ws.getRemoteAddressAsText()),
          );
        },

        close: (ws, code, message) => {
          return;
        },
      })
      .any('/*', (res, req) => {
        res.end('Only ws.');
      })
      .listen(host, port, (token) => {
        if (token) {
          console.log(`Websocket Server started at ws://${host}:${port}`);
        } else {
          console.log(
            `Failed to listen websocket server at ws://${host}:${port}`,
          );
        }
      });
  }

  async addPin(pin: AddPinDto) {
    this.pins.push(pin);

    this.wsClients.forEach(async (ws) => {
      ws.send(
        JSON.stringify({
          cmd: 'pinUpdate',
        }),
      );
    });

    return true;
  }

  async getPins() {
    return this.pins;
  }
}
