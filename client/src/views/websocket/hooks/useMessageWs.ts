import useSocketIO from '@client/hooks/useSocketIO';
import {
  MessageClientToServerEvents,
  MessageServerToClientEvents,
} from '@express-vue-template/types/ws';
import { Socket } from 'socket.io-client';

const socket =
  ref<Socket<MessageServerToClientEvents, MessageClientToServerEvents>>();

export function useMessageWs() {
  const socketState = useSocketIO(socket, {
    url: '/message',
  });

  return {
    ...socketState,
    socket,
  };
}

export default useMessageWs;
