import { Socket, io } from 'socket.io-client';

export function useSocketIO(
  socketInstance: Ref<Socket | undefined>,
  option: { url: string }
) {
  const { url } = option;
  if (!socketInstance.value) {
    socketInstance.value = io(url, {
      path: '/ws/',
    });
  }

  const connected = ref(socketInstance.value?.connected ?? false);
  const id = ref(socketInstance.value?.id ?? '');

  socketInstance.value.on('connect', () => {
    connected.value = true;
    id.value = socketInstance.value?.id ?? '';
  });

  socketInstance.value.on('disconnect', () => {
    connected.value = false;
    id.value = '';
  });

  function disconnect() {
    socketInstance.value?.disconnect();
  }

  function connect() {
    socketInstance.value?.connect();
  }

  return {
    socket: socketInstance,
    connected,
    id,
    connect,
    disconnect,
  };
}

export default useSocketIO;
