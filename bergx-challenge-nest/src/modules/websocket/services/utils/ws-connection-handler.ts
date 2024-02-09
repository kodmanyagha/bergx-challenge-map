import { Nullable } from 'src/common/types';
import { WebSocket } from 'uWebSockets.js';

export default class WsConnectionHandler<T> {
  ws: WebSocket<T>;

  constructor(ws: WebSocket<T>) {
    this.ws = ws;
  }

  getUserData(): Nullable<T> {
    try {
      return this.ws.getUserData();
    } catch (e) {}

    return null;
  }

  send(data): Nullable<number> {
    try {
      return this.ws.send(data);
    } catch (e) {}

    return null;
  }

  publish(roomId, data) {
    try {
      return this.ws.publish(roomId, data);
    } catch (e) {}

    return false;
  }

  unsubscribe(roomId) {
    try {
      return this.ws.unsubscribe(roomId);
    } catch (e) {}

    return false;
  }

  isSubscribed(roomId) {
    try {
      return this.ws.isSubscribed(roomId);
    } catch (e) {}

    return false;
  }

  subscribe(roomId) {
    try {
      return this.ws.subscribe(roomId);
    } catch (e) {}

    return false;
  }

  close() {
    try {
      return this.ws.close();
    } catch (e) {}
  }

  getRemoteAddressAsText(): Nullable<ArrayBuffer> {
    try {
      return this.ws.getRemoteAddressAsText();
    } catch (e) {}
    return null;
  }
}
