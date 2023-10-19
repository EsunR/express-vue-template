import { createServer } from 'http';
import socketIO from 'socket.io';
import {
  MessageClientToServerEvents,
  MessageServerToClientEvents,
} from '@express-vue-template/types/ws';

export let io: socketIO.Server;
export let messageWs: socketIO.Namespace<
  MessageClientToServerEvents,
  MessageServerToClientEvents
>;

export function createIO(server: ReturnType<typeof createServer>) {
  io = new socketIO.Server(server, {
    cors: {
      origin: '*',
    },
    path: '/ws/',
  });

  messageWs = io.of('/message');
  return io;
}
