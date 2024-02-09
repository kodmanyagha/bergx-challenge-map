import { startHttpServer } from 'src/transports/http/http.server';

async function bootstrap() {
  startHttpServer();
}
bootstrap();
