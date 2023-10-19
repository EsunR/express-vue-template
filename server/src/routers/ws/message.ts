import { messageWs } from '@server/instance/ws';

export default function mountMessageWsRoute() {
  messageWs.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('disconnect', () => {
      console.log('user disconnected');
    });

    socket.on('chat message', (msg, callback) => {
      console.log('Server received a chat message: ' + msg);
      callback({ success: true });
      messageWs.emit('chat message', msg);
    });

    socket.on('broadcast message', (msg, callback) => {
      console.log('Server received a broadcast message: ' + msg);
      callback({ success: true });
      socket.broadcast.emit('broadcast message', msg);
    });
  });
}
